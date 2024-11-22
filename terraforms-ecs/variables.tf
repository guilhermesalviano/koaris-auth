variable "aws_region" {
  description = "AWS region"
  default     = "us-east-1"
}

variable "image_url" {
  description = "Image URL in AWS ECR"
  default     = "722043398323.dkr.ecr.us-east-1.amazonaws.com/koaris-auth:latest"
}