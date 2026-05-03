function showYear(year) {
  // Update tabs
  document.querySelectorAll('.year-tab').forEach(t => t.classList.remove('active'));
  event.target.classList.add('active');

  // Update panels
  document.querySelectorAll('.results-panel').forEach(p => p.classList.remove('active'));
  const panel = document.getElementById('panel-' + year);
  if (panel) panel.classList.add('active');

  // Scroll to results
  document.getElementById('results').scrollIntoView({ behavior: 'smooth', block: 'start' });
}
