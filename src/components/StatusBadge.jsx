export default function StatusBadge({ status, size = 'sm' }) {
  const config = {
    overdue: {
      pill: 'bg-[#EF4444] text-white ',
      label: 'Overdue',
    },
    'almost due': {
      pill: 'bg-[#EFAD44] text-white ',
      label: 'Almost Due',
    },
    'on-track': {
      pill: 'bg-[#244D3F] text-white ',
      label: 'On-Track',
    },
  };

  const c = config[status] || config['overdue'];
  const textSize = size === 'sm' ? 'text-xs' : 'text-sm';

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-semibold ${textSize} ${c.pill}`}>
      {c.label}
    </span>
  );
}
