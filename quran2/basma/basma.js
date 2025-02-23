// Load saved basmat from localStorage
let basmat = JSON.parse(localStorage.getItem('basmat')) || [];

// Toggle form visibility
document.getElementById('toggleForm').addEventListener('click', function() {
    const form = document.getElementById('basmaForm');
    const button = document.getElementById('toggleForm');
    const icon = button.querySelector('i');
    
    if (form.style.display === 'none') {
        form.style.display = 'block';
        icon.classList.remove('fa-plus');
        icon.classList.add('fa-minus');
    } else {
        form.style.display = 'none';
        icon.classList.remove('fa-minus');
        icon.classList.add('fa-plus');
    }
});

// Function to save a new basma
function saveBasma() {
    const name = document.getElementById('name').value || 'زائر';
    const dua = document.getElementById('dua').value;
    const message = document.getElementById('message').value;

    if (!dua && !message) {
        alert('الرجاء كتابة دعاء أو رسالة');
        return;
    }

    const now = new Date();
    const basma = {
        name: name,
        dua: dua,
        message: message,
        date: now.toLocaleDateString('ar-SA'),
        gregorianDate: now.toLocaleDateString('ar', { dateStyle: 'full' }),
        time: now.toLocaleTimeString('ar', { 
            hour: '2-digit', 
            minute: '2-digit',
            second: '2-digit',
            hour12: true 
        }),
        timestamp: now.getTime()
    };

    basmat.unshift(basma);
    localStorage.setItem('basmat', JSON.stringify(basmat));
    
    // Clear form
    document.getElementById('name').value = '';
    document.getElementById('dua').value = '';
    document.getElementById('message').value = '';
    
    // Hide form after submission
    document.getElementById('basmaForm').style.display = 'none';
    const button = document.getElementById('toggleForm');
    const icon = button.querySelector('i');
    icon.classList.remove('fa-minus');
    icon.classList.add('fa-plus');
    
    displayBasmat();
    alert('تم حفظ بصمتك بنجاح، جزاك الله خيراً');
}

// Function to display all basmat
function displayBasmat() {
    const basmatList = document.getElementById('basmatList');
    basmatList.innerHTML = '';

    if (basmat.length === 0) {
        basmatList.innerHTML = '<div class="no-data">لا توجد بصمات حالياً</div>';
        return;
    }

    basmat.forEach(basma => {
        const basmaCard = document.createElement('div');
        basmaCard.className = 'basma-card';
        basmaCard.innerHTML = `
            <h3><i class="fas fa-user"></i> ${basma.name}</h3>
            ${basma.dua ? `<p><i class="fas fa-pray"></i> <strong>الدعاء:</strong> ${basma.dua}</p>` : ''}
            ${basma.message ? `<p><i class="fas fa-comment"></i> <strong>الرسالة:</strong> ${basma.message}</p>` : ''}
            <div class="basma-date">
                <p><i class="fas fa-calendar"></i> ${basma.date}</p>
                <p><i class="far fa-calendar-alt"></i> ${basma.gregorianDate || ''}</p>
                <p><i class="far fa-clock"></i> ${basma.time || ''}</p>
            </div>
        `;
        basmatList.appendChild(basmaCard);
    });
}

// Display basmat when page loads
document.addEventListener('DOMContentLoaded', displayBasmat);