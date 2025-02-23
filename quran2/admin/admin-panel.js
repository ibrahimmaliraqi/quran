// التحقق من تسجيل دخول المشرف
if (!sessionStorage.getItem('isAdminLoggedIn')) {
    window.location.href = 'admin.html';
}

// تحميل البصمات من التخزين المحلي
let basmat = JSON.parse(localStorage.getItem('basmat')) || [];

// دالة تسجيل خروج المشرف
function logoutAdmin() {
    sessionStorage.removeItem('isAdminLoggedIn');
    window.location.href = 'admin.html';
}

// دالة حذف بصمة
function deleteBasma(timestamp) {
    if (confirm('هل أنت متأكد من حذف هذه البصمة؟')) {
        basmat = basmat.filter(b => b.timestamp !== timestamp);
        localStorage.setItem('basmat', JSON.stringify(basmat));
        displayBasmat();
        alert('تم حذف البصمة بنجاح');
    }
}

// عرض البصمات مع أزرار الحذف
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
                <button onclick="deleteBasma(${basma.timestamp})" class="delete-button show">
                    <i class="fas fa-trash"></i> حذف
                </button>
            </div>
        `;
        basmatList.appendChild(basmaCard);
    });
}

// عرض البصمات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', displayBasmat);