
        // Data storage functions
        function saveUserData(email, password, loginMethod = 'email') {
            // Get existing users from localStorage
            let users = JSON.parse(localStorage.getItem('techflow_users') || '[]');
            
            // Add new user
            const userData = {
                email: email,
                password: password, // In real app, this should be hashed
                loginMethod: loginMethod,
                registeredAt: new Date().toISOString(),
                lastLogin: new Date().toISOString()
            };
            
            // Check if user already exists
            const existingUserIndex = users.findIndex(user => user.email === email);
            if (existingUserIndex !== -1) {
                // Update existing user
                users[existingUserIndex] = { ...users[existingUserIndex], ...userData };
            } else {
                users.push(userData);
            }
            
            // Save to localStorage
            localStorage.setItem('techflow_users', JSON.stringify(users));
            
            // Prepare data for Excel export (if needed)
            prepareExcelData(users);
            
            return userData;
        }

        function prepareExcelData(users) {
            // Convert to CSV format for Excel compatibility
            const csvHeader = 'Email,Password,Login Method,Registered At,Last Login\n';
            const csvData = users.map(user => 
                `${user.email},${user.password},${user.loginMethod},${user.registeredAt},${user.lastLogin}`
            ).join('\n');
            
            const fullCsv = csvHeader + csvData;
            
            // Store CSV data (in real app, send this to server)
            localStorage.setItem('techflow_csv_data', fullCsv);
            
            console.log('User data prepared for Excel export:', fullCsv);
            
            // In a real application, you would send this data to your server:
            // fetch('/api/save-user-data', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ csvData: fullCsv })
            // });
        }

        function downloadExcelData() {
            const csvData = localStorage.getItem('techflow_csv_data');
            if (csvData) {
                const blob = new Blob([csvData], { type: 'text/csv' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'techflow_users.csv';
                a.click();
                window.URL.revokeObjectURL(url);
            }
        }

        // Mobile menu toggle
        const mobileToggle = document.getElementById('mobileToggle');
        const mobileMenu = document.getElementById('mobileMenu');

        mobileToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            
            const spans = mobileToggle.querySelectorAll('span');
            if (mobileMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close mobile menu when clicking on links
        document.querySelectorAll('.mobile-menu a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });

        // Modal functionality
        const googleModal = document.getElementById('googleModal');
        const googleLoginBtn = document.getElementById('googleLoginBtn');
        const cancelGoogle = document.getElementById('cancelGoogle');
        const googleLoginForm = document.getElementById('googleLoginForm');

        // Show Google modal
        googleLoginBtn.addEventListener('click', function() {
            googleModal.classList.add('active');
            document.getElementById('googleEmail').focus();
        });

        // Hide Google modal
        function hideGoogleModal() {
            googleModal.classList.remove('active');
            document.getElementById('googleEmail').value = '';
            clearValidation('googleEmail');
        }

        cancelGoogle.addEventListener('click', hideGoogleModal);

        // Click outside modal to close
        googleModal.addEventListener('click', function(e) {
            if (e.target === googleModal) {
                hideGoogleModal();
            }
        });

        // Google login form submission
        googleLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const googleEmail = document.getElementById('googleEmail').value.trim();
            
            if (!validateEmail(googleEmail)) {
                showError('googleEmail', 'Please enter a valid Google email address');
                return;
            }
            
            if (!googleEmail.includes('@gmail.com') && !googleEmail.includes('@googlemail.com')) {
                showError('googleEmail', 'Please enter a valid Gmail address');
                return;
            }
            
            // Save user data
            const userData = saveUserData(googleEmail, 'google_auth', 'google');
            
            // Show success message
            showSuccess('googleEmail');
            hideGoogleModal();
            showSuccessMessage(`Successfully signed in with Google: ${googleEmail}`);
            
            // Simulate redirect after delay
            setTimeout(() => {
                alert('Redirecting to dashboard...');
                // window.location.href = '/dashboard';
            }, 2000);
        });

        // GitHub login
        document.getElementById('githubLoginBtn').addEventListener('click', function() {
            // In real app, this would redirect to GitHub OAuth
            const githubUsername = prompt('Enter your GitHub username:');
            if (githubUsername) {
                const githubEmail = `${githubUsername}@github.local`; // Simulated email
                const userData = saveUserData(githubEmail, 'github_auth', 'github');
                showSuccessMessage(`Successfully signed in with GitHub: ${githubUsername}`);
                
                setTimeout(() => {
                    alert('Redirecting to dashboard...');
                    // window.location.href = '/dashboard';
                }, 2000);
            }
        });

        // Form validation and submission
        const loginForm = document.getElementById('loginForm');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const loginBtn = document.getElementById('loginBtn');

        // Email validation
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

        // Show error message
        function showError(inputId, message) {
            const input = document.getElementById(inputId);
            const errorDiv = document.getElementById(inputId + 'Error');
            
            input.classList.add('error');
            input.classList.remove('success');
            errorDiv.textContent = message;
            errorDiv.classList.add('show');
        }

        // Show success
        function showSuccess(inputId) {
            const input = document.getElementById(inputId);
            const errorDiv = document.getElementById(inputId + 'Error');
            
            input.classList.remove('error');
            input.classList.add('success');
            errorDiv.classList.remove('show');
        }

        // Clear validation
        function clearValidation(inputId) {
            const input = document.getElementById(inputId);
            const errorDiv = document.getElementById(inputId + 'Error');
            
            input.classList.remove('error', 'success');
            errorDiv.classList.remove('show');
        }

        // Show success message
        function showSuccessMessage(message) {
            const successDiv = document.getElementById('successMessage');
            successDiv.textContent = message;
            successDiv.classList.add('show');
            
            setTimeout(() => {
                successDiv.classList.remove('show');
            }, 5000);
        }

        // Real-time validation
        emailInput.addEventListener('input', function() {
            const email = this.value.trim();
            
            if (email === '') {
                clearValidation('email');
            } else if (!validateEmail(email)) {
                showError('email', 'Please enter a valid email address');
            } else {
                showSuccess('email');
            }
        });

        passwordInput.addEventListener('input', function() {
            const password = this.value;
            
            if (password === '') {
                clearValidation('password');
            } else if (password.length < 6) {
                showError('password', 'Password must be at least 6 characters');
            } else {
                showSuccess('password');
            }
        });

        // Google email validation
        document.getElementById('googleEmail').addEventListener('input', function() {
            const email = this.value.trim();
            
            if (email === '') {
                clearValidation('googleEmail');
            } else if (!validateEmail(email)) {
                showError('googleEmail', 'Please enter a valid email address');
            } else if (!email.includes('@gmail.com') && !email.includes('@googlemail.com')) {
                showError('googleEmail', 'Please enter a valid Gmail address');
            } else {
                showSuccess('googleEmail');
            }
        });

        // Form submission
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            const password = passwordInput.value;
            let isValid = true;

            // Validate email
            if (email === '') {
                showError('email', 'Email is required');
                isValid = false;
            } else if (!validateEmail(email)) {
                showError('email', 'Please enter a valid email address');
                isValid = false;
            } else {
                showSuccess('email');
            }

            // Validate password
            if (password === '') {
                showError('password', 'Password is required');
                isValid = false;
            } else if (password.length < 6) {
                showError('password', 'Password must be at least 6 characters');
                isValid = false;
            } else {
                showSuccess('password');
            }

            if (isValid) {
                // Show loading state
                loginBtn.classList.add('loading');
                loginBtn.disabled = true;

                // Simulate API call
                setTimeout(() => {
                    loginBtn.classList.remove('loading');
                    loginBtn.disabled = false;
                    
                    // Save user data
                    const userData = saveUserData(email, password, 'email');
                    
                    // Show success message
                    showSuccessMessage(`Successfully signed in: ${email}`);
                    
                    // Simulate redirect
                    setTimeout(() => {
                        alert('Redirecting to dashboard...');
                        // window.location.href = '/dashboard';
                    }, 2000);
                }, 2000);
            }
        });

        // Header scroll effect
        window.addEventListener('scroll', function() {
            const header = document.querySelector('.header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = 'var(--header-bg)';
                header.style.backdropFilter = 'none';
            }
        });

        // Add keyboard support for modal
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && googleModal.classList.contains('active')) {
                hideGoogleModal();
            }
        });

        // Console log for developers
        console.log('TechFlow Login System Initialized');
        console.log('To download user data as CSV, run: downloadExcelData()');
        
        // Make downloadExcelData available globally for testing
        window.downloadExcelData = downloadExcelData;