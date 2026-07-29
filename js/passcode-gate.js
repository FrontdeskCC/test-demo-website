(function() {
    // 1. Check if authorized
    if (sessionStorage.getItem('cadence_demo_auth') === 'true') {
        return; // Already authorized
    }

    // 2. Hide body content temporarily using CSS
    const style = document.createElement('style');
    style.id = 'passcode-gate-styles';
    style.innerHTML = `
        body > *:not(#passcode-gate) {
            display: none !important;
        }
        body {
            background-color: #09090b !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
        }
    `;
    document.head.appendChild(style);

    // 3. Wait for DOM to load, then inject the passcode gate
    window.addEventListener('DOMContentLoaded', () => {
        const gate = document.createElement('div');
        gate.id = 'passcode-gate';
        gate.style.cssText = 'position: fixed; inset: 0; z-index: 99999; display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: #09090b; color: #ffffff; padding-left: 1rem; padding-right: 1rem; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;';
        
        gate.innerHTML = `
            <!-- Subtle Background Blur -->
            <div style="position: absolute; inset: 0; background: radial-gradient(circle at center, rgba(181, 154, 87, 0.08) 0%, rgba(9, 9, 11, 0) 70%); pointer-events: none; z-index: 0;"></div>
            
            <div style="position: relative; z-index: 10; max-w: 24rem; width: 100%; text-align: center; display: flex; flex-direction: column; gap: 2rem;">
                <!-- Branded Logo -->
                <div style="display: flex; flex-direction: column; align-items: center; user-select: none;">
                    <div style="display: flex; align-items: baseline; gap: 0.375rem; line-height: 1;">
                        <span style="font-size: 1.875rem; font-weight: 800; letter-spacing: -0.025em; color: #ffffff;">CADENCE</span>
                        <span style="font-size: 1.875rem; font-weight: 300; letter-spacing: -0.025em; color: #71717a;">CLINIC</span>
                    </div>
                    <span style="font-size: 0.625rem; color: #a1a1aa; letter-spacing: 0.16em; text-transform: uppercase; font-weight: 600; margin-top: 0.5rem;">
                        Private Review Session
                    </span>
                </div>

                <!-- Prompt -->
                <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                    <h2 style="font-size: 1.125rem; font-weight: 700; color: #f4f4f5; margin: 0;">Enter Demo Passcode</h2>
                    <p style="font-size: 0.75rem; color: #a1a1aa; font-weight: 300; line-height: 1.4; margin: 0;">This is a private preview. Please enter the passcode to view the clinic layout.</p>
                </div>

                <!-- Form -->
                <div style="display: flex; flex-direction: column; gap: 1rem; width: 100%;">
                    <div style="position: relative;">
                        <input type="password" id="demo-passcode" placeholder="••••••••" style="width: 100%; box-sizing: border-box; padding: 0.75rem 1rem; background-color: #18181b; border: 1px solid #27272a; border-radius: 0.75rem; text-align: center; font-size: 1.125rem; color: #ffffff; letter-spacing: 0.25em; transition: border-color 0.2s;" onkeydown="if(event.key==='Enter') window.checkPasscode()">
                    </div>
                    <button onclick="window.checkPasscode()" style="width: 100%; padding: 0.75rem; background-color: #ffffff; color: #09090b; font-weight: 600; border: none; border-radius: 0.75rem; font-size: 0.875rem; cursor: pointer; transition: background-color 0.2s; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
                        Verify & Enter
                    </button>
                    <p id="passcode-error" style="font-size: 0.75rem; color: #f43f5e; font-weight: 500; margin: 0; display: none;">Incorrect passcode. Please try again.</p>
                </div>
            </div>
        `;
        document.body.appendChild(gate);
        
        // Focus the input automatically
        const input = document.getElementById('demo-passcode');
        if (input) input.focus();
    });

    // 4. Verification Logic
    window.checkPasscode = function() {
        const inputElement = document.getElementById('demo-passcode');
        const passcode = inputElement ? inputElement.value : '';
        const error = document.getElementById('passcode-error');
        
        if (passcode === 'cadence2026') {
            sessionStorage.setItem('cadence_demo_auth', 'true');
            // Remove style block and gate
            const style = document.getElementById('passcode-gate-styles');
            if (style) style.remove();
            const gate = document.getElementById('passcode-gate');
            if (gate) gate.remove();
            // Allow body overflow
            document.body.style.overflow = '';
        } else {
            if (error) {
                error.style.display = 'block';
                const input = document.getElementById('demo-passcode');
                if (input) {
                    input.value = '';
                    input.style.borderColor = '#f43f5e';
                    input.focus();
                }
            }
        }
    };
})();
