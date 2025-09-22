// Basic UI interactions: page routing, nav toggle, hero book button, table selection, form submit
document.addEventListener('DOMContentLoaded', function () {
  // -- Simple client-side "routing" (show/hide sections) --
  const links = document.querySelectorAll('.nav-link');
  const pages = document.querySelectorAll('.page-section');

  function showPage(pageId) {
    pages.forEach(p => {
      if (p.id === pageId) p.hidden = false;
      else p.hidden = true;
    });
    links.forEach(a => a.classList.toggle('active', a.dataset.page === pageId));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  links.forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const page = a.dataset.page;
      showPage(page);
    });
  });

  // default show home
  showPage('home');

  // -- Nav toggle for mobile --
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  navToggle.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
  });

  // close mobile nav on outside click
  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navLinks.contains(e.target) && window.innerWidth <= 880) {
      navLinks.style.display = 'none';
    }
  });

  // hero book button behavior -> go to đặt bàn
  const heroBookBtn = document.getElementById('hero-book-btn');
  const btnCta = document.getElementById('btn-cta');
  heroBookBtn.addEventListener('click', () => showPage('table-booking'));
  btnCta.addEventListener('click', () => showPage('table-booking'));

  // -- Set min date for date inputs to today --
  function setMinDate(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    input.min = `${yyyy}-${mm}-${dd}`;
  }
  setMinDate('tb-date');
  setMinDate('ev-date');

  // -- Build table grid dynamically (example: 30 tables) --
  const tableGrid = document.getElementById('table-grid');
  const totalTables = 30; // demo
  // Sample booked tables for demo (in real app backend provides)
  const demoBooked = new Set([2, 5, 9, 14, 18, 21]); // table numbers already booked

  for (let i = 1; i <= totalTables; i++) {
    const div = document.createElement('div');
    div.className = 'table';
    div.tabIndex = 0;
    div.dataset.table = `B${String(i).padStart(2, '0')}`;
    div.textContent = div.dataset.table;
    if (demoBooked.has(i)) {
      div.classList.add('booked');
      div.setAttribute('aria-disabled', 'true');
    }
    tableGrid.appendChild(div);
  }

  // table selection logic
  const selectedTables = new Set();
  const selectedSummary = document.getElementById('selected-summary');

  tableGrid.addEventListener('click', (e) => {
    const t = e.target.closest('.table');
    if (!t || t.classList.contains('booked')) return;
    const id = t.dataset.table;
    if (t.classList.contains('selected')) {
      t.classList.remove('selected');
      selectedTables.delete(id);
    } else {
      // allow multiple selection (for parties) but you can restrict to 1 by clearing set first
      selectedTables.add(id);
      t.classList.add('selected');
    }
    updateSelectedSummary();
  });

  function updateSelectedSummary() {
    if (selectedTables.size === 0) {
      selectedSummary.textContent = '';
    } else {
      selectedSummary.textContent = 'Bàn đã chọn: ' + Array.from(selectedTables).join(', ');
    }
  }

  // -- Table booking form submit (demo) --
  const tbForm = document.getElementById('table-booking-form');
  const bookingConfirmation = document.getElementById('booking-confirmation');

  tbForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const guests = tbForm['tb-guests'].value;
    const date = tbForm['tb-date'].value;
    const time = tbForm['tb-time'].value;
    const space = tbForm['tb-space'].value;
    const note = tbForm['tb-note'].value;
    if (!date || !time) {
      alert('Vui lòng chọn ngày và giờ.');
      return;
    }
    if (selectedTables.size === 0) {
      // allow booking without selecting table? we can allow or prompt
      if (!confirm('Bạn chưa chọn bàn. Tiếp tục đặt mà không chọn bàn cụ thể?')) return;
    }
    // create confirmation message (demo)
    const tables = selectedTables.size ? Array.from(selectedTables).join(', ') : 'Chưa chọn cụ thể';
    bookingConfirmation.hidden = false;
    bookingConfirmation.innerHTML = `Đặt bàn thành công!<br>
      Ngày: <strong>${date}</strong> • Giờ: <strong>${time}</strong><br>
      Khách: <strong>${guests}</strong> • Không gian: <strong>${space}</strong><br>
      Bàn: <strong>${tables}</strong><br>
      Ghi chú: ${note ? `<em>${note}</em>` : 'Không'}<br><br>
      Quán sẽ liên hệ để xác nhận.`;
    // reset selection (demo)
    document.querySelectorAll('.table.selected').forEach(el => el.classList.remove('selected'));
    selectedTables.clear();
    updateSelectedSummary();
    tbForm.reset();
    setMinDate('tb-date');
  });

  // -- Event booking submit (demo) --
  const evForm = document.getElementById('event-booking-form');
  const evConfirm = document.getElementById('event-confirmation');

  evForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const guests = evForm['ev-guests'].value;
    const date = evForm['ev-date'].value;
    const time = evForm['ev-time'].value;
    const space = evForm['ev-space'].value;
    const pack = evForm['ev-package'].value;
    if (!date || !time) { alert('Vui lòng chọn ngày & giờ'); return; }
    evConfirm.hidden = false;
    evConfirm.innerHTML = `Yêu cầu đặt tiệc đã được gửi!<br>
      Ngày: <strong>${date}</strong> • Giờ: <strong>${time}</strong><br>
      Số khách: <strong>${guests}</strong> • Không gian: <strong>${space}</strong><br>
      Gói: <strong>${pack}</strong><br><br>
      Nhân viên sẽ liên hệ để xác nhận chi tiết và cọc (nếu cần).`;
    evForm.reset();
    setMinDate('ev-date');
  });

  // -- Simple login placeholder (no backend) --
  const loginForm = document.getElementById('login-form');
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Đăng nhập demo (không thực hiện backend). Sau khi login sẽ redirect tới dashboard (nếu có).');
    loginForm.reset();
    showPage('home');
  });

  // Keyboard accessibility: Enter on logo focuses home
  document.querySelector('.logo').addEventListener('click', () => showPage('home'));

});
