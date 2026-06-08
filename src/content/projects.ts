// TODO: confirm-with-client — replace with real project photos and details.

export interface Project {
  id:       string
  capacity: string
  type:     'grid-tie' | 'hybrid' | 'off-grid' | 'commercial'
  location: string
  year:     string
  image:    string    // TODO: confirm-with-client — real installation photo
  imageAlt: string
  hue:      number    // placeholder gradient hue while real photo is pending
}

export const PROJECTS: Project[] = [
  { id: 'p1', capacity: '3 kW',  type: 'grid-tie',   location: 'Kakkanad, Ernakulam',     year: '2024', image: '/images/project-01.jpg', imageAlt: '3kW rooftop solar Kakkanad',    hue: 40  },
  { id: 'p2', capacity: '5 kW',  type: 'hybrid',     location: 'Aluva, Ernakulam',         year: '2024', image: '/images/project-02.jpg', imageAlt: '5kW hybrid solar Aluva',        hue: 200 },
  { id: 'p3', capacity: '10 kW', type: 'commercial', location: 'Tripunithura, Ernakulam',  year: '2024', image: '/images/project-03.jpg', imageAlt: '10kW commercial solar',          hue: 30  },
  { id: 'p4', capacity: '4 kW',  type: 'grid-tie',   location: 'Muvattupuzha, Ernakulam', year: '2023', image: '/images/project-04.jpg', imageAlt: '4kW grid-tie Muvattupuzha',     hue: 220 },
  { id: 'p5', capacity: '6 kW',  type: 'grid-tie',   location: 'Angamaly, Ernakulam',      year: '2023', image: '/images/project-05.jpg', imageAlt: '6kW rooftop solar Angamaly',    hue: 50  },
  { id: 'p6', capacity: '3 kW',  type: 'grid-tie',   location: 'Kothamangalam, Ernakulam', year: '2023', image: '/images/project-06.jpg', imageAlt: '3kW grid-tie Kothamangalam',    hue: 180 },
]
