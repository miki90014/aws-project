resource "aws_instance" "proj_ec2_build" {
  ami           = local.aws.instance_ami
  instance_type = local.aws.instance_type

  vpc_security_group_ids = [aws_security_group.proj_sg.id]

  user_data                   = <<-USERDATAEOF
    #!/bin/bash
    sudo apt-get --assume-yes update
    sudo apt-get install ca-certificates curl
    sudo install -m 0755 -d /etc/apt/keyrings
    sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
    sudo chmod a+r /etc/apt/keyrings/docker.asc
    echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
    $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
    sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    sudo apt-get --assume-yes update
    sudo apt-get --assume-yes install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    docker --version
    docker compose version
    

    cat <<-'BASHRCEOF' >> /home/ubuntu/.bashrc
    ${file("../scripts/bashrc.sh")}
    BASHRCEOF
    cat <<-'BUILDEOF' > /home/ubuntu/build.sh
    ${file("../scripts/build.sh")}
    BUILDEOF
    chmod +x /home/ubuntu/build.sh
    # Dodanie zmiennych środowiskowych
    echo "export COGNITO_POOL_ID=${aws_cognito_user_pool.user_pool.id}" >> /home/ubuntu/.bashrc
    echo "export COGNITO_CLIENT_ID=${aws_cognito_user_pool_client.cognito_client.id}" >> /home/ubuntu/.bashrc
    /home/ubuntu/build.sh

  USERDATAEOF
  user_data_replace_on_change = true

  tags = {
    Name = "proj EC2 BUILD"
  }

  depends_on = [
    aws_cognito_user_pool.user_pool,
    aws_cognito_user_pool_client.cognito_client
  ]
}
