---
layout: default
title: Resources
permalink: /resources

menus:
  about:
    icon: <i class="fas fa-toolbox"></i>
    identifier: resources
    is_child: true
    skip_title: false
    weight: 10
---

## Resources
Will be providing links here for the hackathon situation:


### Datasets (GCP Bucket = `koala-onesie-verona-2023/`):
_Be careful when opening these links, they will automatically
download a bunch of massive data files..._

#### Key Datasets: ⭑
  - [California Traffic Collision Data from SWITRS (archive.zip)](https://storage.googleapis.com/koala-onesie-verona-2023/California%20Traffic%20Collision%20Data%20from%20SWITRS/archive.zip)
    - Source: [Kaggle](https://www.kaggle.com/datasets/alexgude/california-traffic-collision-data-from-switrs)
  - [CA Weather (weather_CA_2019.csv.gz)](https://storage.googleapis.com/koala-onesie-verona-2023/Weather/weather_CA_2019.csv.gz)
  - [LA Traffic Collision Data (Traffic_Collision_Data_from_2010_to_Present.csv.gz)](https://storage.googleapis.com/koala-onesie-verona-2023/LA%20Open%20Data/Traffic_Collision_Data_from_2010_to_Present.csv.gz)
    - Source: [LA Open Data - Traffic Collision Data from 2010 to Present](https://data.lacity.org/Public-Safety/Traffic-Collision-Data-from-2010-to-Present/d5tf-ez2w)

#### Other Interesting Datasets:
  - [FTC Complaints (complaints.csv.gz)](https://storage.googleapis.com/koala-onesie-verona-2023/FTC/complaints.csv.gz)
  - CA Traffic Volumes
    - [Traffic (Traffic_Volumes_AADT.csv)](https://storage.googleapis.com/koala-onesie-verona-2023/CA%20Traffic%20Volumes/Traffic_Volumes_AADT.csv)
    - [Truck (Truck__Volumes_AADT.csv)](https://storage.googleapis.com/koala-onesie-verona-2023/CA%20Traffic%20Volumes/Truck__Volumes_AADT.csv)
    - Source:
      - [California Open Data Portal](https://data.ca.gov/dataset/truck-volumes-aadt) (reference)
      - [California Department of Transportation](https://dot.ca.gov/programs/traffic-operations/census) (true source)

  - *LA specific:*
    - [LA Parking Violations (Parking_Citations.csv.gz)](https://storage.googleapis.com/koala-onesie-verona-2023/LA%20Open%20Data/Parking_Citations.csv.gz)
      - Source: [LA Open Data - Parking Citations](https://data.lacity.org/Transportation/Parking-Citations/wjz9-h9np)
    - [Vehicle and Pedestrian Stop Data (Vehicle_and_Pedestrian_Stop_Data_2010_to_June_30th__2018.csv.gz)](https://storage.googleapis.com/koala-onesie-verona-2023/LA%20Open%20Data/Vehicle_and_Pedestrian_Stop_Data_2010_to_June_30th__2018.csv.gz)
      - Source: [LA Open Data - Vehicle and Pedestrian Stop Data 2010 to June 30th, 2018](https://data.lacity.org/Public-Safety/Vehicle-and-Pedestrian-Stop-Data-2010-to-June-30th/ci25-wgt7)

### Data Related Information:
- Vehicle Deaths:
  - U.S. Department of Transportation's [Fatality Analysis Reporting System (FARS)](https://www-fars.nhtsa.dot.gov/Main/index.aspx).
  - [Fatality Facts 2020, State by state](https://www.iihs.org/topics/fatality-statistics/detail/state-by-state)
  - Transportation reporter [Tanya Snyder's tweet about car deaths](https://twitter.com/TSnyderDC/status/1610409933601927168?s=20)
  - ​CA Highway Patrol - SWITRS [2019 Annual Report of Fatal and Injury Motor Vehicle Traffic Collisions](https://www.chp.ca.gov/programs-services/services-information/switrs-internet-statewide-integrated-traffic-records-system/switrs-2019-report)
- Vehicle, Fuel, and Road Conditions:
  - [Fuel Economy Data](https://www.fueleconomy.gov/feg/download.shtml) _(not that helpful tbh...)_
  - [California Department of Transportation - Traffic Manuel](https://dot.ca.gov/programs/safety-programs/camutcd/traffic-manual-ch9)

### Tools & Resources:
- [Beekeeper Studio ⭑](https://www.beekeeperstudio.io/get)
- [DuckDB](https://duckdb.org/)
  - [DuckDB CLI](https://duckdb.org/docs/api/cli.html)
- [DBT](https://docs.getdbt.com/)
- [Homebrew (for mac users)](https://brew.sh/)
- [Python 3.10.9](https://www.python.org/downloads/release/python-3109/)
- [Sqlite](https://www.sqlite.org/index.html)
- [GZIP Documentation](https://water.usgs.gov/GIS/gzip/gzip_doc.txt)

### Key Stuff
- My Github: [https://github.com/ybressler](https://github.com/ybressler)
- Mess Around Repo: [https://github.com/ybressler/mess-around-duckdb](https://github.com/ybressler/mess-around-duckdb)

### Helpful commands:

1. Zip a csv (compression):
  ```
  gzip -kv9 data.csv
  ```
Flags:
  - `k`: keep original file
  - `v9`: use "best compression algorithm"


2. Unzip a csv (decompression):
  ```
  gunzip -k data.csv.gz
  ```

3. Create a new python virtual environment:
  ```
  python3 -m venv venv
  ```
  Arguments:
    - `python3` use this executable (in path) to do the following...
    - `-m`: make
    - `venv` a virtual environment
    - `venv` (could be any name), store the virtual environment in "this directory"

    The same command works too:
      ```
      python3 -m venv my_virtual_environment_name
      ```

4. Activate a virtual environment:
  ```
  source venv/bin/activate
  ```
  Where `venv/` is the directory of your virtual environment


5. Install dependencies (from requirements.txt):
  ```
  pip install -r requirements.txt
  ```

6. Store dependencies into a requirements.txt:
  ```
  pip freeze > requirements.txt
  ```

## Helpful Images
<div class="collapsable-images">

  <details open class="child">
    <summary>
      Tanya Snyder's tweet about car deaths
    </summary>
    <img src="images/tmp/Tanya Snyder tweet about car deaths.png" alt="Tanya Snyder's tweet about car deaths">
  </details>

  <details class="child">
    <summary>
      Comparing DB engines (we like DuckDB)
    </summary>
    <img src="images/tmp/Comparing DB engines.jpeg" alt="Comparing DB engines">
  </details>


</div>
