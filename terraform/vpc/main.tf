# private network inside aws
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  enable_dns_support = true # we access this true so that we can access remaining modules
  enable_dns_hostnames = true
  tags = {
    Name = "chattime-vpc"
  }
}
data "aws_availability_zones" "available" {}
# for frontend to access 
resource "aws_subnet" "public" {
    count = 2 
    vpc_id = aws_vpc.main.id
    cidr_block = cidrsubnet(aws_vpc.main.cidr_block , 8 , count.index) # we split vpc cidr block into 2^8 smaller subnets and pick index count 
    map_public_ip_on_launch = true
    availability_zone = data.aws_availability_zones.available.names[count.index]

    tags = {name = "chattime-subnet-${count.index}"}
}
#
resource "aws_internet_gateway" "gw" {
  vpc_id = aws_vpc.main.id
  tags = {Name = "chattime-gateway"}
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.gw.id
  }
}

resource "aws_route_table_association" "a" {
  count = length(aws_subnet.public)
  subnet_id = aws_subnet.public[count.index].id
  route_table_id = aws_route_table.public.id
}
output "vpc_id" {
  value = aws_vpc.main.id
}
output "subnets_id" {
    value = aws_subnet.public[*].id
}