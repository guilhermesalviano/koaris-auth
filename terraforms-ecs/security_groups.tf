# Create a security group
resource "aws_security_group" "my_security_group" {
  vpc_id = aws_vpc.my_vpc.id

  ingress {
    from_port   = 3333
    to_port     = 3333
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Allow access from anywhere (adjust as needed)
  }

  egress {
    from_port   = 0    # Allow all outbound traffic
    to_port     = 0    # Allow all outbound traffic
    protocol    = "-1"  # All protocols
    cidr_blocks = ["0.0.0.0/0"]  # Allow all outbound traffic
    ipv6_cidr_blocks = ["::/0"]
  }
}