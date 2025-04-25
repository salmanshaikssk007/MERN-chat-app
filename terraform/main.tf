provider "aws" {
    region = var.aws.region
}

module "vpc" {
    source = "./vpc"

}
module "eks" {
    source = "./eks"
    vpc_id     = module.vpc.vpc_id
    subnet_ids = module.vpc.subnet_ids
}
module "s3" {
    source = "./s3"
}