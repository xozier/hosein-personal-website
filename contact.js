// Initialize EmailJS with your public key
emailjs.init({
    publicKey: "XhfoQRA7lFGz27_5B",
}); 

window.onload = function() {
    const contactForm = document.getElementById('contact-form');
    const successModal = document.getElementById('success-modal');
    const closeModalBtn = document.querySelector('.close-modal');

    // Generate random contact number
    const contactNumber = Math.random() * 100000 | 0;
    contactForm.querySelector('input[name="contact_number"]').value = contactNumber;

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        emailjs.sendForm('service_9wd35hb', 'template_pmsyx6t', this)
            .then(function() {
                // Show success modal
                successModal.classList.add('show');
                // Reset form
                contactForm.reset();
            }, function(error) {
                console.log('FAILED...', error);
                alert('Sorry, there was an error sending your message. Please try again.');
            });
    });

    // Close modal when clicking the close button
    closeModalBtn.addEventListener('click', function() {
        successModal.classList.remove('show');
    });

    // Close modal when clicking outside
    successModal.addEventListener('click', function(e) {
        if (e.target === successModal) {
            successModal.classList.remove('show');
        }
    });
}; 