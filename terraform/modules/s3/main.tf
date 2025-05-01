resource "aws_s3_bucket" "chattime_bucket" {
  bucket = "chattime-media-storage-${random_id.bucket_suffix.hex}"

  versioning {
    enabled = true
  }
  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }
  tags = {
    Name = "chattime s3 bucket"
  }
}

resource "random_id" "bucket_suffix" {
  byte_length = 4
}
resource "aws_dynamodb_table" "terraform_locks" {
  name         = "terraform-locks"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }

  tags = {
    Name = "TerraformLockTable"
  }
}
resource "aws_s3_bucket_cors_configuration" "chatapp_cors" {
  bucket = aws_s3_bucket.chattime_bucket.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "PUT", "POST", "DELETE"]
    allowed_origins = ["*"] # Replace with frontend URL in prod
    max_age_seconds = 3000
  }
}

