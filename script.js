const webhookUrl = "https://discord.com/api/webhooks/1479109120505413714/7cfiqUxq6LBgr52bt0RXx-hB0As5a_rdxbIAUQOi6wUaQE79p-QfSKJ3-E0JIBLtrMy5";

const form = document.getElementById('signupForm');
const statusPara = document.getElementById('status');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const roblox = document.getElementById('roblox').value.trim();
    const discord = document.getElementById('discord').value.trim();

    if (!roblox || !discord) {
        statusPara.textContent = 'Both fields are required.';
        return;
    }

    const payload = {
        content: `**New Gamenight signup**\nRoblox: ${roblox}\nDiscord: ${discord}`
    };

    statusPara.textContent = 'Sending...';

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            statusPara.textContent = 'Signup sent! Thank you.';
            form.reset();
        } else {
            statusPara.textContent = 'Failed to send signup. Please try again.';
            console.error('Discord webhook error:', response.status, await response.text());
        }
    } catch (err) {
        statusPara.textContent = 'Network error. Please try again.';
        console.error(err);
    }
});