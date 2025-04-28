// /utils/sendSMS.js

const sendSMS = async (phoneNumber, message) => {
    try {
        console.log(`\n==============================`);
        console.log(`📨 Sending SMS (Simulation Mode)`);
        console.log(`To: ${phoneNumber}`);
        console.log(`Message: ${message}`);
        console.log(`==============================\n`);
        // Simulating delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        return { success: true, message: 'SMS sent (simulated)' };
    } catch (error) {
        console.error('❌ Failed to send SMS:', error);
        throw error;
    }
};

module.exports = { sendSMS };
