#!/bin/bash
echo "Starting S3 bucket initialization..."

# (Optional) set fake AWS creds for the CLI
export AWS_ACCESS_KEY_ID=test AWS_SECRET_ACCESS_KEY=test

# Create your custom bucket
awslocal s3 mb s3://il.co.johnbryce.tomerogn

echo "Uploading images to bucket..."
awslocal s3 cp /tmp/localstack-images/download.jpg s3://il.co.johnbryce.tomerogn/download.jpg --acl public-read
awslocal s3 cp "/tmp/localstack-images/images (1).jpg" s3://il.co.johnbryce.tomerogn/images-1.jpg --acl public-read
awslocal s3 cp /tmp/localstack-images/images.jpg s3://il.co.johnbryce.tomerogn/images.jpg --acl public-read
awslocal s3 cp "/tmp/localstack-images/Avoid-the-tourist-traps-….jpg" s3://il.co.johnbryce.tomerogn/florida-guide.jpg --acl public-read
awslocal s3 cp "/tmp/localstack-images/…-relax-48267410.webp" s3://il.co.johnbryce.tomerogn/santorini.webp --acl public-read

echo "Bucket contents:"
awslocal s3 ls s3://il.co.johnbryce.tomerogn

echo "S3 bucket initialization complete!"
