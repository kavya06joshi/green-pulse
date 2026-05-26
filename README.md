## 🌱 Inspiration

I watched our city's waste collection truck arrive every single day — 
no timing, no planning, just burning fuel and collecting almost nothing. 
Then I noticed my sister and her coworker travelling to the same office 
in two separate vehicles every single day. I stopped watching. 
I started building. GreenPulse is the result — four real problems 
I witnessed personally, solved through four connected live apps.

---

## 🌍 What is GreenPulse?

GreenPulse is a smart city sustainability ecosystem — not one app, 
but four connected platforms that together cover the complete 
lifecycle of urban waste and fuel management.

---

## 🏙️ App 1 — Green City Hub (Eco City Portal)
**"Because the truck shouldn't come when nobody's ready"**

### Who uses it?
City residents, housing societies, and municipal administrators.

### How it works — step by step:
1. **Citizen opens the portal** and sees their area's waste 
   collection schedule — day, time, and waste type expected
2. **Segregation guidelines** are clearly shown — wet waste, 
   dry waste, hazardous waste — so citizens know exactly how 
   to prepare before the truck arrives
3. **Green Points system** — citizens earn points for consistent 
   waste segregation, encouraging long term behaviour change
4. **Admin side** — municipal staff can update collection 
   schedules, add new zones, and manage area-wise timings
5. Once waste is collected and segregated by city workers, 
   it flows into the next app — **Waste Exchange Nexus**

---

## ♻️ App 2 — Waste Exchange Nexus
**"Your garbage has value — let's find it"**

### Who uses it?
Three types of users — **Admin (municipal authority)**, 
**Industries (buyers)**, and **City workers (collectors)**.

### How it works — step by step:

#### Admin Flow:
1. Admin logs in and sees the **waste inventory dashboard**
2. Admin enters the type of waste collected — plastic, metal, 
   paper, organic — along with quantity in kg/tonnes
3. Admin sets the **price per kg** for each waste category 
   and lists it on the marketplace
4. Admin can track all active listings, pending orders, 
   and completed transactions in real time

#### Industry Flow:
1. Industry representative logs in and browses the 
   **waste marketplace** — filtered by waste type, 
   quantity, and price
2. Industry selects the waste listing they need 
   (e.g. 500kg of plastic waste for recycling)
3. Industry places a **purchase request** with quantity needed
4. Admin approves the request and coordinates pickup/delivery
5. Transaction is recorded — city earns direct revenue 
   from waste, completing the circular economy loop

#### The Exchange:
- Waste that would have gone to a landfill now becomes 
  **raw material for industries**
- Industries get affordable recycled input material
- City gets revenue and reduces landfill burden
- Environment wins — waste never leaves the productive cycle

---

## 🛢️ App 3 — SUCO System (Oil Good Deeds)
**"Don't pour it down the drain — power a vehicle with it"**

### Who uses it?
Two very different collector types — **Housing Societies** 
and **Small Restaurant Owners** — plus a collection admin.

### How it works — step by step:

#### Housing Society Flow:
1. Society secretary registers their apartment complex 
   on the platform
2. Residents are informed to collect used cooking oil 
   in provided containers
3. Society secretary schedules a **group pickup request** 
   on the app — date, time, estimated quantity
4. A SUCO collection agent arrives, collects the oil, 
   and logs the pickup quantity
5. Society earns **sports kit rewards** under the 
   FSSAI RUCO government scheme based on oil quantity

#### Restaurant Owner Flow:
1. Individual small restaurant owner registers on the platform
2. Owner logs their approximate weekly used oil quantity
3. Owner places a **pickup request** directly from the app
4. Collection agent arrives at the restaurant, 
   collects and logs the oil
5. Restaurant owner receives reward points and 
   pickup confirmation receipt

#### What happens to the oil:
- All collected used cooking oil is sent to a 
  **biodiesel processing unit**
- Oil is converted into clean **biodiesel fuel** 
  under FSSAI RUCO guidelines
- This biodiesel powers vehicles — including potentially 
  the very waste collection trucks from App 1, 
  closing the GreenPulse loop completely

---

## 🚗 App 4 — Green Sathi (PoolMate)
**"Same office, same road — why two cars?"**

### Who uses it?
City residents and office goers — as either a 
**Driver** or a **Rider**.

### How it works — step by step:

#### Driver Flow:
1. Driver registers and creates a **commute listing** — 
   starting point, destination, date, time, 
   available seats, and fuel contribution expected
2. Driver sets their **recurring schedule** 
   (e.g. Monday to Friday, 9am, same route)
3. Driver sees all **incoming ride requests** from riders 
   on their route and accepts or declines
4. After the ride, driver logs the trip — 
   fuel saved is calculated and shown on their dashboard

#### Rider Flow:
1. Rider registers and searches for available 
   carpools by entering their pickup area and destination
2. Rider sees a list of matching drivers with their 
   timing, route, and seat availability
3. Rider sends a **join request** to the preferred driver
4. Once accepted, rider gets driver contact details 
   and pickup confirmation
5. Rider rates the driver after the trip — 
   building a trust-based community rating system

#### Environmental Impact Tracker:
- Every completed carpool ride calculates 
  **fuel saved in litres** and **CO2 emissions avoided**
- Users can see their personal green contribution 
  on their profile dashboard
- City-wide fuel savings are aggregated and displayed, 
  showing the collective environmental impact

---

## 🔗 How All 4 Apps Connect as GreenPulse

The real power of GreenPulse is not any single app — 
it is how they work together:

1. **Citizen** checks Green City Hub → knows when 
   to keep waste ready
2. **City worker** collects segregated waste → 
   logs it on Workers Portal (in development)
3. **Admin** lists waste on Waste Exchange Nexus → 
   **Industry buys it** → city earns revenue
4. **Used cooking oil** from homes and restaurants → 
   SUCO System collects it → converted to **biodiesel**
5. That biodiesel potentially **fuels the collection trucks** 
   → loop complete
6. Meanwhile **Green Sathi** reduces daily fuel consumption 
   across the city → less demand, less pollution

> *Every app feeds the next. Every action in one app 
> creates value in another. This is GreenPulse.*

---

## 🔧 How We Built It

- All 4 apps built as **React web applications**
- Deployed on **Firebase Hosting**
- **Firestore** for real-time database 
  (waste listings, schedules, ride requests)
- **Firebase Authentication** for role-based 
  login (admin, industry, citizen, driver, rider)
- **Lovable** used for rapid UI development 
  and component building
- Each app independently functional but connected 
  through shared GreenPulse ecosystem navigation

---

## ⚡ Challenges We Faced

- Building two completely separate user flows inside 
  SUCO System — housing societies operate very differently 
  from individual restaurant owners
- Connecting 4 independently developed apps into one 
  coherent ecosystem without breaking existing Firebase 
  configs and authentication
- Green Sathi runs on a separate Firebase project from 
  the other 3 apps — managing two different configs 
  while presenting them as one platform
- Designing interfaces simple enough for everyday 
  citizens, waste workers, and restaurant owners 
  who may not be tech savvy

---

## 🎓 What We Learned

Real environmental impact does not come from one 
big complex app. It comes from connecting small, 
focused solutions that each solve one piece of 
the problem with precision. Every app in GreenPulse 
is one pulse of the city's green heartbeat.

---

## 🚀 What's Next

🚧 Workers Portal (Coming Soon) — UI/UX Preview: https://workers-portal.lovable.app — This is a design preview only. The Workers Portal will empower city waste collection workers to manage daily routes, log pickups and track collections across city zones. Full development coming soon
- Real time GPS tracking of waste collection trucks 
  on city map integrated into Green City Hub
- Direct API integration with municipal corporations 
  for live schedule data
- Expanding SUCO System to Tier 2 and Tier 3 
  cities across India
- Carbon credit system — cities earn tradeable 
  carbon credits based on verified waste reduction 
  and fuel savings data from GreenPulse

## 🔑 Test Credentials

### 🏙️ Green City Hub
- **URL:** https://green-city-hub-28fd0.web.app
- **Email:** citizen1@test.com, citizen2@test.com
- **Password:** 123456, 123456

### ♻️ Waste Exchange Nexus
- **URL:** https://waste-exchange-nexus-28fd0.web.app
- **Admin Email:** admin@test.com
- **Admin Password:** 123456
- **Industry Email:** biz2@test.com, biz1@test.com
- **Industry Password:** 123456

### 🛢️ Oil Good Deeds
- **URL:** https://oil-good-deeds-28fd0.web.app
- **Email:** oilsoc1@test.com, oilcom1@test.com
- **Password:** 123456

### 🚗 Green Sathi
- **URL:** https://green-sathi-aac37.web.app
- **Driver/RiderEmail:** driver1@poolmate.com, rider1@poolmate.com, rider2@poolmate.com, rider3@poolmate.com, tomato@poolmate.com, tomatorider@poolmate.com
- **Driver Password:** 123456
