// TODO: confirm-with-client — replace with real customer testimonials, names, and photos.
// Placeholder content only. Do NOT present as verified real customers until confirmed.

export interface Testimonial {
  id:       string
  quote:    string
  name:     string      // TODO: confirm-with-client
  location: string
  system:   string
  year:     string
  photo?:   string      // TODO: confirm-with-client
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id:       't1',
    quote:    'Bill was ₹6,000 every month. Now it\'s ₹0. Skilltech handled everything — KSEB approval, subsidy, installation. Three months from quote to commission.',
    name:     'Placeholder Name',    // TODO: confirm-with-client
    location: 'Kakkanad, Ernakulam',
    system:   '4 kW Grid-tie',
    year:     '2024',
  },
  {
    id:       't2',
    quote:    'The system survived two monsoons without a single problem. Lightning protection was their suggestion — glad we took it.',
    name:     'Placeholder Name',    // TODO: confirm-with-client
    location: 'Aluva, Ernakulam',
    system:   '5 kW Grid-tie',
    year:     '2023',
  },
  {
    id:       't3',
    quote:    'Very professional team. Neat wiring, no roof leaks, KSEB net-meter connected in three weeks. Highly recommend for anyone in Ernakulam.',
    name:     'Placeholder Name',    // TODO: confirm-with-client
    location: 'Muvattupuzha, Ernakulam',
    system:   '3 kW Grid-tie',
    year:     '2024',
  },
]
