output "api_url" {
  value = aws_lambda_function_url.app_default.function_url
  description = "API Gateway URL for the status endpoint"
}
output "api_name" {
  value = aws_lambda_function_url.app_default.function_name
  description = "API Gateway URL for the status endpoint"
}
output "api_arn" {
  value = aws_lambda_function_url.app_default.function_arn
  description = "API Gateway URL for the status endpoint"
}