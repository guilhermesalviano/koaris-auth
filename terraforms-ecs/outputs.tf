output "ecs_service_dns_name" {
  value = aws_ecs_service.koaris-auth_service.network_configuration[0].subnets
}