resource "aws_lambda_function" "app" {
    function_name    = "koaris-auth"
    role             = aws_iam_role.handler_lambda_exec.arn
    handler          = "src/lambda.handler"
    s3_bucket        = aws_s3_bucket.lambda_bucket.id
    s3_key           = aws_s3_object.lambda_handler.key
    source_code_hash = filebase64sha256(data.external.lambda_zip.result.file_path)

    runtime = "nodejs18.x"

    # reserved_concurrent_executions = 1
    memory_size                    = 512
    timeout                        = 15

    environment {
      variables = {
        LAMBDA_HANDLER = "src/lambda.handler"
        APPLICATION_NAME="koaris-auth"
        APPLICATION_VERSION="$LATEST"
      }
    }
}

#resource "aws_lambda_alias" "app_default" {
#  name             = "default"
#  description      = "Default lambda alias"
#  function_name    = aws_lambda_function.app.arn
#  function_version = aws_lambda_function.app.version
#}

resource "aws_lambda_function_url" "app_default" {
  function_name      = aws_lambda_function.app.arn
  authorization_type = "NONE"
}

resource "aws_iam_role" "handler_lambda_exec" {
  name = "handler-lambda"

  assume_role_policy = <<POLICY
    {
        "Version": "2012-10-17",
        "Statement": [
            {
            "Action": "sts:AssumeRole",
            "Principal": {
                "Service": [
                "lambda.amazonaws.com"
                ]
            },
            "Effect": "Allow",
            "Sid": ""
            }
        ]
    }
    POLICY
}

resource "aws_iam_role_policy_attachment" "handler_lambda_policy" {
  role = aws_iam_role.handler_lambda_exec.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_cloudwatch_log_group" "handler" {
  name = "/aws/lamda/${aws_lambda_function.app.function_name}"

  retention_in_days = 14
}

data "external" "lambda_zip" {
  program = ["bash", "scripts/generateLambdaZip.sh"]

  query = {
    environment      = "prod"
    application_name = "koaris-auth"
  }
}

#data "archive_file" "lambda_handler" {
#    type = "zip"

#    source_dir  = data.external.lambda_zip.result.file_path
#    output_path = "../${data.external.lambda_zip.result.file_path}/lambda.zip"
#}

resource "aws_s3_object" "lambda_handler" {
    bucket = aws_s3_bucket.lambda_bucket.id

    key = "lambda.zip"
    source = data.external.lambda_zip.result.file_path

    etag = filemd5(data.external.lambda_zip.result.file_path)
}