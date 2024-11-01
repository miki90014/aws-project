output "ec2_build_instance_id" {
  value = aws_instance.proj_ec2_build.id
}

output "ec2_build_public_ip" {
  value = aws_instance.proj_ec2_build.public_ip
}
