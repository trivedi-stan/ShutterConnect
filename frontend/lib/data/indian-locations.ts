export interface City {
  name: string
  state: string
}

export interface State {
  name: string
  code: string
  cities: string[]
}

export const INDIAN_STATES: State[] = [
  {
    name: "Delhi",
    code: "DL",
    cities: ["New Delhi", "Central Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi", "North East Delhi", "North West Delhi", "South East Delhi", "South West Delhi", "Shahdara"]
  },
  {
    name: "Maharashtra",
    code: "MH", 
    cities: ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Solapur", "Amravati", "Kolhapur", "Sangli", "Malegaon", "Jalgaon", "Akola", "Latur", "Dhule", "Ahmednagar", "Chandrapur", "Parbhani", "Ichalkaranji", "Jalna", "Ambernath"]
  },
  {
    name: "Karnataka",
    code: "KA",
    cities: ["Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum", "Gulbarga", "Davanagere", "Bellary", "Bijapur", "Shimoga", "Tumkur", "Raichur", "Bidar", "Hospet", "Hassan", "Gadag", "Udupi", "Robertsonpet", "Bhadravati", "Chitradurga"]
  },
  {
    name: "Tamil Nadu",
    code: "TN",
    cities: ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Tiruppur", "Ranipet", "Nagercoil", "Thanjavur", "Vellore", "Kancheepuram", "Erode", "Tiruvannamalai", "Pollachi", "Rajapalayam", "Sivakasi", "Pudukkottai", "Neyveli", "Nagapattinam"]
  },
  {
    name: "Uttar Pradesh", 
    code: "UP",
    cities: ["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Varanasi", "Meerut", "Allahabad", "Bareilly", "Aligarh", "Moradabad", "Saharanpur", "Gorakhpur", "Noida", "Firozabad", "Jhansi", "Muzaffarnagar", "Mathura", "Rampur", "Shahjahanpur", "Farrukhabad"]
  },
  {
    name: "Gujarat",
    code: "GJ",
    cities: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Junagadh", "Gandhinagar", "Akola", "Anand", "Navsari", "Morbi", "Mahesana", "Bharuch", "Vapi", "Ankleshwar", "Godhra", "Veraval", "Porbandar", "Palanpur"]
  },
  {
    name: "Rajasthan",
    code: "RJ", 
    cities: ["Jaipur", "Jodhpur", "Kota", "Bikaner", "Ajmer", "Udaipur", "Bhilwara", "Alwar", "Bharatpur", "Sikar", "Pali", "Sri Ganganagar", "Kishangarh", "Baran", "Dhaulpur", "Tonk", "Beawar", "Hanumangarh"]
  },
  {
    name: "West Bengal",
    code: "WB",
    cities: ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri", "Malda", "Bardhaman", "Barasat", "Raiganj", "Kharagpur", "Haldia", "Nabadwip", "Medinipur", "Jalpaiguri", "Balurghat", "Basirhat", "Bankura", "Chakdaha", "Darjeeling", "Alipurduar"]
  },
  {
    name: "Madhya Pradesh",
    code: "MP",
    cities: ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain", "Sagar", "Dewas", "Satna", "Ratlam", "Rewa", "Murwara", "Singrauli", "Burhanpur", "Khandwa", "Bhind", "Chhindwara", "Guna", "Shivpuri", "Vidisha", "Chhatarpur"]
  },
  {
    name: "Andhra Pradesh",
    code: "AP",
    cities: ["Hyderabad", "Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Rajahmundry", "Kadapa", "Kakinada", "Tirupati", "Anantapur", "Vizianagaram", "Eluru", "Ongole", "Nandyal", "Machilipatnam", "Adoni", "Tenali", "Chittoor", "Hindupur"]
  },
  {
    name: "Telangana",
    code: "TS",
    cities: ["Hyderabad", "Warangal", "Nizamabad", "Khammam", "Karimnagar", "Ramagundam", "Mahabubnagar", "Nalgonda", "Adilabad", "Suryapet", "Miryalaguda", "Jagtial", "Mancherial", "Nirmal", "Kothagudem", "Bodhan", "Sangareddy", "Metpally", "Zaheerabad", "Medak"]
  },
  {
    name: "Kerala",
    code: "KL",
    cities: ["Thiruvananthapuram", "Kochi", "Kozhikode", "Kollam", "Thrissur", "Alappuzha", "Palakkad", "Kannur", "Kasaragod", "Kottayam", "Malappuram", "Pathanamthitta", "Idukki", "Ernakulam", "Wayanad"]
  },
  {
    name: "Punjab",
    code: "PB",
    cities: ["Chandigarh", "Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Hoshiarpur", "Batala", "Pathankot", "Moga", "Abohar", "Malerkotla", "Khanna", "Phagwara", "Muktsar", "Barnala", "Rajpura", "Firozpur", "Kapurthala", "Zirakpur"]
  },
  {
    name: "Haryana",
    code: "HR",
    cities: ["Faridabad", "Gurgaon", "Panipat", "Ambala", "Yamunanagar", "Rohtak", "Hisar", "Karnal", "Sonipat", "Kaithal", "Sirsa", "Bahadurgarh", "Jind", "Thanesar", "Kaithal", "Rewari", "Narnaul", "Pundri", "Kosli", "Palwal"]
  },
  {
    name: "Bihar",
    code: "BR",
    cities: ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia", "Darbhanga", "Bihar Sharif", "Arrah", "Begusarai", "Katihar", "Munger", "Chhapra", "Danapur", "Saharsa", "Sasaram", "Hajipur", "Dehri", "Siwan", "Motihari", "Nawada"]
  },
  {
    name: "Odisha",
    code: "OR",
    cities: ["Bhubaneswar", "Cuttack", "Rourkela", "Brahmapur", "Sambalpur", "Puri", "Balasore", "Bhadrak", "Baripada", "Jharsuguda", "Jeypore", "Bhawanipatna", "Barbil", "Kendujhar", "Sunabeda", "Rayagada", "Jatani", "Chhatrapur", "Byasanagar", "Paradip"]
  }
]

export const getAllCities = (): City[] => {
  const cities: City[] = []
  INDIAN_STATES.forEach(state => {
    state.cities.forEach(city => {
      cities.push({ name: city, state: state.name })
    })
  })
  return cities
}

export const getCitiesByState = (stateName: string): string[] => {
  const state = INDIAN_STATES.find(s => s.name === stateName)
  return state ? state.cities : []
}

export const getStateByCity = (cityName: string): string | null => {
  for (const state of INDIAN_STATES) {
    if (state.cities.includes(cityName)) {
      return state.name
    }
  }
  return null
}
