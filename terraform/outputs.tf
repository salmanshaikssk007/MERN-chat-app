output "vpc_id" {
  value = module.vpc.vpc_id
}

output "subnet_ids" {
  value = module.vpc.subnet_ids
}

output "bucket_name" {
  value = module.s3.bucket_name
}

output "eks_cluster_endpoint" {
  value = module.eks.cluster_endpoint
}