variable "vpc_id" {
  description = "The VPC ID to deploy EKS cluster into"
  type        = string
}

variable "subnet_ids" {
  description = "List of subnet IDs for EKS worker nodes"
  type        = list(string)
}