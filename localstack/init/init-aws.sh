#!/bin/bash

echo "Starting S3 bucket initialization..."

# Create the bucket 
export AWS_ACCESS_KEY_ID=000000000000 AWS_SECRET_ACCESS_KEY=000000000000
awslocal s3 mb s3://il.co.johnbryce.tomerogn

# Upload each image individually
echo "Uploading images to bucket..."
awslocal s3 cp /tmp/localstack-images/barcelona.jpg s3://il.co.johnbryce.tomerogn/Barcelona.jpg --acl public-read
awslocal s3 cp /tmp/localstack-images/budapest.webp s3://il.co.johnbryce.tomerogn/budapest.webp --acl public-read
awslocal s3 cp /tmp/localstack-images/hadera.jpg s3://il.co.johnbryce.tomerogn/hadera.jpg --acl public-read
awslocal s3 cp /tmp/localstack-images/machu-picchu.jpg s3://il.co.johnbryce.tomerogn/machu-picchu.jpg --acl public-read
awslocal s3 cp /tmp/localstack-images/New-York-City.jpg s3://il.co.johnbryce.tomerogn/New-York-City.jpg --acl public-read
awslocal s3 cp /tmp/localstack-images/paris.jpg s3://il.co.johnbryce.tomerogn/paris.jpg --acl public-read
awslocal s3 cp /tmp/localstack-images/santorini.jpeg s3://il.co.johnbryce.tomerogn/santorini.jpeg --acl public-read
awslocal s3 cp /tmp/localstack-images/tokyo.webp s3://il.co.johnbryce.tomerogn/tokyo.webp --acl public-read
awslocal s3 cp /tmp/localstack-images/Venice.jpg s3://il.co.johnbryce.tomerogn/Venice.jpg --acl public-read
awslocal s3 cp /tmp/localstack-images/kyoto.jpg s3://il.co.johnbryce.tomerogn/kyoto.jpg --acl public-read
awslocal s3 cp /tmp/localstack-images/bali.webp s3://il.co.johnbryce.tomerogn/bali.webp --acl public-read
awslocal s3 cp /tmp/localstack-images/marrakech.jpg s3://il.co.johnbryce.tomerogn/marrakech.jpg --acl public-read

# List bucket contents to verify
echo "Bucket contents:"
awslocal s3 ls s3://il.co.johnbryce.tomerogn

echo "S3 bucket initialization complete!"