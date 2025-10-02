# SSH/SCP - Vast.ai Documentation – Affordable GPU Cloud Marketplace

**URL:** https://docs.vast.ai/instances/sshscp

---

## About SSH

**SSH (Secure Shell)** is a protocol for safely connecting to remote servers. It encrypts your connection so you can:

*   Log in securely
*   Run commands remotely
*   Transfer files without exposing your data

### Quck start: Generate and add your SSH key to your Vast account.

*   Terminal
    
*   Vast CLI
    

**1.Generate a SSH key pair in your terminal**

1.  Creates two files (by default in ~/.ssh/):
    *   id\_ed25519 → your **private key** (keep safe, never share).
    *   id\_ed25519.pub → your **public key** (safe to share, add to servers).
2.  \-C “[your\_email@example.com](mailto:your_email@example.com)” is optional. Whatever you put there is stored as a comment in the public key file (e.g., id\_ed25519.pub). It’s just for identification (helpful if you use multiple keys), not for security.

**2.Copy your public key.**

**3\. Add it in your** [**vast account**](https://cloud.vast.ai/manage-keys/)**.**![](https://mintcdn.com/vastai-80aa3a82/rJSuh7NkZ00k8fzX/images/instances-sshscp.webp?fit=max&auto=format&n=rJSuh7NkZ00k8fzX&q=85&s=0c4875e49e2b1250de56ca5d06c8dd8a)

## Connecting to your Instance

Start a new instance and click the SSH icon to see your connection information.

Now you can enter the connection command string into your terminal

Bash

```
ssh -p 20544 root@142.214.185.187 -L 8080:localhost:8080

The authenticity of host '[142.214.185.187]:20544 ([142.214.185.187]:20544)' can't be established.
ED25519 key fingerprint is SHA256:WTUphznpN0zikMp+L5EtZpiCH6EeZ2PA/7+DSXDRjT0.
This key is not known by any other names.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
```

You should now see a screen similar to this. You will, by default, be placed into a tmux session.

### Tmux

We connect you to a tmux session by default for reliability and to prevent unintentional termination of foreground processes. You can create a new bash terminal window with `ctrl+b` + `c`. Cycle through your windows with `ctrl+b` + `n` There is an excellent guide for getting to grips with tmux at [https://tmuxcheatsheet.com](https://tmuxcheatsheet.com/) If, however, you would prefer to disable TMUX, you can apply the following either in a terminal or from your template’s on-start section.

Text

```
touch ~/.no_auto_tmux
```

## SSH Local Port Forwarding

An often overlooked feature of SSH is its ability to forward local ports to another machine. When you access a server remotely over SSH, you can make ports from the remote machine available as if they were listening on your own device. This is a secure alternative to opening ports on the public interface as all data is transported over the SSH connection.

Bash

```
ssh -p 1234 root@180.123.123.123 -L 8080:localhost:8080 -L 5000:localhost:5000
```

This SSH command connects to the remote instance and sets up **local port forwarding** (SSH tunneling): **Connection details:**

*   Connects to IP 180.123.123.123 as user root
*   Uses port 1234 instead of the default SSH port 22

**Port forwarding (the key part):**

*   `-L 8080:localhost:8080` - Creates a tunnel so when you access localhost:8080 on your local machine, it forwards to port `8080` on the remote server
*   `-L 5000:localhost:5000` \- Same thing for port `5000`

You can repeat the `-L` arguments to forward as many ports as you need. **What this means:** After connecting, you can open your web browser and go to https://localhost:8080 or http://localhost:5000 on your local computer, and you’ll actually be accessing services running on those ports on the remote server. It’s like creating secure “tunnels” through the SSH connection to reach applications on the remote machine that might not be directly accessible from the internet.

## SSH Alternative - Jupyter Terminal

As a simple alternative to SSH, you might like to consider Jupyter Terminal instead. All instances started in Jupyter launch mode will have this enabled. It is a very straightforward web-based terminal with session persistence. It’s great for a quick CLI session. Access the terminal from the SSH connections interface. ![](https://mintcdn.com/vastai-80aa3a82/rJSuh7NkZ00k8fzX/images/instances-sshscp-5.webp?fit=max&auto=format&n=rJSuh7NkZ00k8fzX&q=85&s=209bceca0c9c25960269d6af03a4ec00)

## Troubleshooting

You can often determine the exact cause of a connection failure by using the -vv arguments with ssh to get more information. Common reasons include:

*   Using the wrong private key
*   Incorrect permissions for your private key
*   Public key not added to instance or account
*   Connecting to the wrong port

## SCP & SFTP File Transfer

Both **SCP** (Secure Copy Protocol) and **SFTP** (SSH File Transfer Protocol) are tools for securely transferring files that piggyback on the SSH protocol. They use the same authentication and encryption as SSH.

### SCP (Secure Copy Protocol)

*   **What it is:** Simple, command-line tool for copying files between local and remote machines
*   **Best for:** Quick, one-time file transfers
*   **Syntax:** `scp -P <port> source destination`

**Examples:**

Bash

```
# Copy file TO instance
scp -P <ssh_port> my_file.txt root@<instance_ip>:/workspace/
# Copy file FROM remote server  
scp -P <ssh_port> root@<instance_ip>:/workspace/my_file.txt ./
# Copy entire directory
scp -P <ssh_port> -r  myfolder/ root@<instance_ip>:/workspace/
```

### SFTP (SSH File Transfer Protocol)

*   **What it is:** Interactive file transfer program with a full command set
*   **Best for:** Managing files, browsing directories, multiple operations
*   **Usage:** CLI or GUI tools available

**Example:**

Bash

```
# Establish connection
sftp -P <ssh_port> root@<instance_ip>

Welcome to vast.ai. If authentication fails, try again after a few seconds, and double check your ssh key.
Have fun!
Connected to 79.116.73.220.
sftp> ls
hasbooted   onstart.sh
```

## VS Code Integration

Once you have your ssh keys set up, connecting to VS Code is quite straightforward. We will cover the basics here.

### Install the Remote SSH extension

You will need to add the remote extension named ‘Remote - SSH’. ![](https://mintcdn.com/vastai-80aa3a82/rJSuh7NkZ00k8fzX/images/instances-sshscp-6.webp?fit=max&auto=format&n=rJSuh7NkZ00k8fzX&q=85&s=17c9e3e3a16d8c26955d3514ae1711e6)

### Open Remote Window

Click the open remote window button.

Enter your ssh address details in the box that appears at the top of your window![](https://mintcdn.com/vastai-80aa3a82/rJSuh7NkZ00k8fzX/images/instances-sshscp-8.webp?fit=max&auto=format&n=rJSuh7NkZ00k8fzX&q=85&s=34351926e878b0b59c9a24d4262bbdba)

Now simply allow a moment for VS code to configure the instance and you will be able to work with the instance as if it was a local machine. For more information, see the [VS Code documentation](https://code.visualstudio.com/docs/remote/ssh).

## GUI Setup Guide (Windows)

Several GUI tools are available to help with SSH connectivity. While it is often most straightforward to use the terminal we will cover some of the popular options here. For each application we will assume the following:

*   IP address: 142.114.29.158
*   Port: 46230
*   Username: root

### PuTTY

[PuTTY](https://www.chiark.greenend.org.uk/~sgtatham/putty/) consists of two important components - PuTTY for making connections and PuTTYGen for creating SSH keys. First, we will generate a public and private key pair. PuTTy uses its own `.ppk` private key type. Open PuTTYGen and click the ‘Generate’ button. You will be asked to move your mouse around until the green bar is full.

Once the key generation has completed, save both your public and private key somewhere safe such as in your Documents folder. Optionally you can enter a passphrase for your private key for added security. Next, copy the full public key to the clipboard and add it to your account at [https://cloud.vast.ai/manage-keys/](https://cloud.vast.ai/manage-keys/)

Now that we have a suitable key to use, close PuTTYGen and open the main PuTTY application. In the ‘Session’ tab, enter the **IP address** and the **port**

Next, move to the ‘Connection -> Data\` tab and set the Auto-login username to ‘root’

Now navigate to ‘Connection -> SSH -> Auth -> Credentials’ and browse for the private key (.ppk) that you saved earlier.

Finally navigate back to the ‘Sessions’ tab to save the connection details. Here I have saved the session with the instance ID so that I can access it again later.

Finally, Click the ‘Open’ button to be connected to your instance PuTTY has many additional features to explore. Find the full documentation [here](https://www.chiark.greenend.org.uk/~sgtatham/putty/docs.html)

### MobaXterm

First, we need to create a public and private key pair. MobaXterm uses puTTY style `.ppk` keys. Open the application and navigate to Tools -> MobaKeyGen (SSH Key Generator) Glick the ‘Generate’ button. You will be asked to move your mouse around until the green bar is full

Once the key generation has completed, save both your public and private key somewhere safe such as in your Documents folder. Optionally you can enter a passphrase for your private key for added security. Next, copy the full public key to the clipboard and add it to your account at [https://cloud.vast.ai/manage-keys/](https://cloud.vast.ai/manage-keys/)

Now you can close the key generation interface. We will create a new session. Navigate to Sessions -> New Session -> SSH

Important details to complete:

*   Remote Host
*   Specify Username (root)
*   Port
*   Use private key

Click ‘OK’ and you will be connected to the instance.

You can find the documentation for MobaXterm [here](https://mobaxterm.mobatek.net/documentation.html).

### Other GUI Clients

Many GUI clients are available for Windows and other operating systems, and although it is not possible to cover all of these here, the key things to remember when setting up are:

*   Create a public and private key pair
*   Add the public key to your vast account and any running instances
*   Keep the private key safe
*   Ensure you are connecting to the correct IP address and port as user `root`