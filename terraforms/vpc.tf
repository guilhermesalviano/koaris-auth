# Create a VPC
resource "aws_vpc" "my_vpc" {
  cidr_block = "10.0.0.0/16"
}

# Create public subnets (use 1 AZ to save costs)
resource "aws_subnet" "my_public_subnet" {
  vpc_id                 = aws_vpc.my_vpc.id
  cidr_block             = "10.0.1.0/24"
  availability_zone      = data.aws_availability_zones.available.names[0]
  map_public_ip_on_launch = true
}

# Create an Internet Gateway
resource "aws_internet_gateway" "my_igw" {
  vpc_id = aws_vpc.my_vpc.id
}

# Create a Route Table and associate it
resource "aws_route_table" "public_route_table" {
  vpc_id = aws_vpc.my_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.my_igw.id
  }
}

resource "aws_route_table_association" "public_association" {
  subnet_id      = aws_subnet.my_public_subnet.id
  route_table_id = aws_route_table.public_route_table.id
}

# Data source to get availability zones
data "aws_availability_zones" "available" {}
