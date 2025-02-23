// بيانات تسجيل الدخول
const ADMIN_CREDENTIALS = {
    username: "almgroad",
    password: "07700770.iA"
};

function loginAsAdmin() {
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        // تخزين حالة تسجيل الدخول
        sessionStorage.setItem('isAdminLoggedIn', 'true');
        // التوجيه إلى صفحة إدارة البصمات
        window.location.href = '../admin-panel.html';
    } else {
        alert('اسم المستخدم أو كلمة المرور غير صحيحة');
        document.getElementById('adminUsername').value = '';
        document.getElementById('adminPassword').value = '';
    }
}