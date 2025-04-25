resource "aws_s3_bucket" "chattime-bucket" {
  bucket = "chattime-media-storage-${random_id.bucket_suffix.hex}"

  tags = {
    Name = "chattime-media"
  }
}

resource "random_id" "bucket_suffix" {
  byte_length = 4
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
output "bucket_name" {
  value = aws_s3_bucket.chattime-bucket.id
}
