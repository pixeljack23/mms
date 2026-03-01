// Floating receipt modal logic for restaurant
function showRestaurantReceiptModal(order) {
  const modal = document.getElementById('restaurantReceiptModal');
  const details = document.getElementById('restaurantReceiptDetails');
  if (!modal || !details) return;
  if (!order || !order.items || order.items.length === 0) {
    details.innerHTML = '<span style="color:#b91c1c">No order found.</span>';
    modal.style.display = 'flex';
    return;
  }
  const dateObj = new Date();
  const dateStr = dateObj.toLocaleDateString('en-GB');
  const timeStr = dateObj.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  let itemsHtml = order.items.map(item => `
    <div class="r-row"><span class="r-label">${item.name} x${item.quantity}</span> <span class="r-value">KES ${(item.price * item.quantity).toLocaleString(undefined, {minimumFractionDigits:2})}</span></div>
  `).join('');
  details.innerHTML = `
    <div class="r-header">PUKORET HOMES</div>
    <div class="r-sub">Restaurant POS Receipt</div>
    <div class="r-divider"></div>
    <div class="r-section" style="text-align:center;font-weight:bold;">RECEIPT</div>
    <div class="r-section">
      <div class="r-row"><span class="r-label">Date:</span> <span class="r-value">${dateStr}</span></div>
      <div class="r-row"><span class="r-label">Time:</span> <span class="r-value">${timeStr}</span></div>
    </div>
    <div class="r-divider"></div>
    <div class="r-section"><div style="font-weight:bold;">Order Details:</div>${itemsHtml}</div>
    <div class="r-divider"></div>
    <div class="r-row" style="margin-top:10px;"><span class="r-label">Subtotal:</span> <span class="r-value">KES ${order.subtotal.toLocaleString(undefined, {minimumFractionDigits:2})}</span></div>
    <!-- VAT line removed as requested -->
    <div class="r-total">TOTAL: KES ${order.total.toLocaleString(undefined, {minimumFractionDigits:2})}</div>
    <div class="r-divider"></div>
    <div class="r-welcome">Thank you for dining<br>with us!<br><br>PUKORET HOMES</div>
  `;
  modal.style.display = 'flex';
  // Show print and close buttons when receipt is visible
  const printBtn = document.getElementById('printRestaurantReceiptBtn');
  const closeBtn = document.getElementById('closeRestaurantReceiptBtn');
  if (printBtn) printBtn.style.display = 'block';
  if (closeBtn) closeBtn.style.display = 'block';
}

function closeRestaurantReceiptModal() {
  const modal = document.getElementById('restaurantReceiptModal');
  if (modal) modal.style.display = 'none';
  // Hide print and close buttons when receipt is closed
  const printBtn = document.getElementById('printRestaurantReceiptBtn');
  const closeBtn = document.getElementById('closeRestaurantReceiptBtn');
  if (printBtn) printBtn.style.display = 'none';
  if (closeBtn) closeBtn.style.display = 'none';
}

function printRestaurantReceipt() {
  const modal = document.getElementById('restaurantReceiptModal');
  if (!modal) return;
  const printContents = modal.querySelector('.modal-content').innerHTML;
  const win = window.open('', '', 'width=600,height=700');
  win.document.write('<html><head><title>Print Receipt</title>');
  win.document.write('<link rel="stylesheet" href="css/style.css">');
  win.document.write('</head><body style="background:#fff;">');
  win.document.write('<div style="max-width:420px;margin:60px auto;">' + printContents + '</div>');
  win.document.write('</body></html>');
  win.document.close();
  win.focus();
  win.print();
  setTimeout(() => {
    win.close();
    closeRestaurantReceiptModal();
  }, 500);
}
