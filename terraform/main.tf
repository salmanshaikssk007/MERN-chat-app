provider "aws" {
  region = var.region
}
terraform {
  backend "s3" {
    bucket         = "chatapp-terraform-state-bucket"
    key            = "env/dev/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-locks"
    encrypt        = true
  }
}
module "vpc" {
  source = "./modules/vpc"

}
module "eks" {
  source     = "./modules/eks"
  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.subnet_ids
}
module "s3" {
  source = "./modules/s3"
}