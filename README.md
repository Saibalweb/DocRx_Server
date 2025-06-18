## Built With
<div>
<img src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="node"/>
<img src="https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white" alt="express"/>
<img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="mongodb"/>
<img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" alt="jwt"/>
<img src="https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white" alt = "nginx">
<img src="https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white" alt = "aws">
</div>

## FrontEnd of This Project
This is BackEnd of the project . For FrontEnd Code -
<pre>
Please Visit - <a href="https://github.com/Saibalweb/DocRx" target="_blank">DocRx</a>
</pre>

## About This Project

DocRx is a mobile application that allows users to create and manage their own medical records.In the fast-paced world of healthcare, the ability to manage prescriptions accurately and efficiently is paramount. Traditional paper-based prescriptions are prone to errors, can be easily lost, and require significant administrative effort. DocRx addresses these challenges by offering a digital solution that enhances the accuracy, accessibility, and security of prescription records.This is a simple API for a medical prescription management system. It allows users to create, read.

## Data Model
The data model for this application is as follows:
![DocRx-datamodel](https://github.com/Saibalweb/DocRx_Server/blob/master/Readme_Assets/DocRx_DataModel.png)

## Project Structure
The folder structure of this app is explained below:

| Name | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **node_modules**         | Contains all  npm dependencies  |
| **src**                  | Contains  source code |
| **src/controllers**      | Controllers define functions to serve various express routes. |
| **src/db**               | Contain Database connection  |
| **src/middlewares**      | Express middlewares which process the incoming requests before handling them down to the |
| **src/models**            | Models define schemas that will be used in storing and retrieving data from Application. |
| **src/routes**           | Contain all express routes, separated by module/area of application|     
| **src/utils**            | Common libraries to be used across your app.  |
| **src**/index.js         | Entry point to express app | 
| **src**/app.js           | Contains Basic configuration like cors ,bodyParser | 
| package.json             | Contains npm dependencies   | 
tsconfig.json            | Config settings for compiling source code only written in TypeScript | 
tslint.json              | Config settings for TSLint code  style checking |

## Environment vars
This project uses the following environment variables: 

| Name                         | Description                         |  Example Value                               |
| -----------------------------| ------------------------------------| -----------------------------------------------|
|CORS                          | Cors accepted values                  | "*"      |
|PORT                          | The port on which the server will run| 3000      |
|MONGODB_URI                   | Your MongoDb Uri                     |       |
|AccessToken Secret            | Your Unique random AccessToken secret to generate accessToken          |       |
|RefreshToken Secret           | Your Unique random RefreshToken secret to generate RefreshToken       |       |
|AccessToken Expiry            | Duration for accessToken validaty          |     10m,1h,1d  |
|RefreshToken Expiry           | Duration for RefreshToken validaty    |    10m,1h,1d,10d   |

## API Reference

### Authentication
-----
Many of Api routes are completely secured . It needs secured token like **accessToken** or **refreshToken** to get data. 
To generate accessToken or refreshToken you generally need to **register** and **login** in this app

to authenticate you need to send token in in **header** in your request like this-

<pre>
Authorization: Bearer your_access_token
</pre>

**Now there are different end points for this server . lets look all of this -**

### Register
------
This is not secured routes . You need to register as a doctor to use this app.
Register as a doctor -

```
  POST /api/v1/doctor/register
```
**Request Body**
| Field        | Type   | Required |
|--------------|--------|----------|
| name         | string | Yes      |
| email        |string  | Yes      | 
| password     | string | Yes      | 

### Login
----------
To Login -
```
    POST /api/v1/doctor/login
```
**Request Body**
| Field        | Type   | Required |
|--------------|--------|----------|
| name         | string | Yes      |
| email        |string  | Yes      | 

### Complete Registration
-----
After login you need to complete your registration . You need to provide your academic details , reg not ,degree etc.
```
    POST /api/v1/doctor/complete-details
```
<details>
<summary>Request Body</summary>

| Field                       | Type   | Required |
|-----------------------------|--------|----------|
| degree                      | string | Yes      |
|  regNo                      | string | Yes      |
| specialisation              |string  | No      | 
| specialisation_degree       | string | No      |
| superSpecialisation         |string  | No      | 
| superSpecialisation_degree  |string  | No      | 
| otherDetails                |string  | No      | 

</details>

### Add Address
------
Adding address for doctor dispensary 
```
    POST /api/v1/doctor/add-address
```
<details>
<summary>Request Body</summary>
    
| Field                   | Type   | Required |
|-------------------------|--------|----------|
| streetName              | string | Yes      |
|  dispensaryName         | string | No      |
| city                    |string  | Yes      | 
| state                   | string | Yes      |
| postal                  |string  | Yes      | 
| practiceDays            |[String] | No      | 
| practiceHours           |Object  | No      | 
|    ├──startTime         |string  | No      | 
|    └──practiceHours     |string  | No      | 
</details>

### Refresh Token 
------------------------
Refresh token to get new access token
```
    POST /api/v1/doctor/refresh-token
```
**Request Body**
| Field                   | Type   | Required |
|-------------------------|--------|----------|
| refreshToken            | string | Yes      |

### Search Medicine
---------------------------
Search medicine by name , generic name

```
  GET /api/v1/medicine/search
```
**Request Params**
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| str       | string   | **Required**. Search String of any medicine |
| limit     | integer  | **Optional**. Limit of search result |


### Create Prescription
----------------------------
Create prescription for patient
```
    POST /api/v1/patient/prescribe
```
<details>
<summary>Request Body</summary>

### patientDetails

| **Field**                          | **Type**   | **Required** | **Description**                          |
|------------------------------------|------------|--------------|------------------------------------------|
| patientDetails                     | object     | Yes          | Parent object containing patient info    |
| patientDetails.name                | string     | Yes          | Patient's name                           |
| patientDetails.age                 | number     | Yes          | Patient's age                            |
| patientDetails.weight              | number     | Yes           | Patient's weight in kg                   |
| patientDetails.MobileNo            | number     | Yes          | Patient's mobile number                  |
| patientDetails.gender              | string     | Yes          | Patient's gender (e.g., "male", "female")|
| patientDetails.medicalHistory      | object     | No          | Medical history of the patient           |
| patientDetails.medicalHistory.allergy       | string | No      | List of allergies (comma-separated)      |
| patientDetails.medicalHistory.socialHistory | string | No      | Social history details                   |
| patientDetails.medicalHistory.drugHistory  | string | No      | History of drug use                      |

---

### prescribePatient

| **Field**                          | **Type**           | **Required** |**Description**                              |
|------------------------------------|--------------------|--------------|---------------------------------------------|
| prescribePatient                   | object             | Yes          | Parent object for prescription details      |
| prescribePatient.doctorChamberAddress | string         | Yes          | Doctor's chamber address ID                  |
| prescribePatient.investigationDone | array of strings   | No           | List of investigations already completed    |
| prescribePatient.investigationNeeded | array of strings | No          | List of investigations to be conducted      |
| prescribePatient.cheifComplaint    | array of strings   | No          | List of patient's chief complaints         |
| prescribePatient.diagonosis        | array of strings   | No          | List of diagnoses                          |
| prescribePatient.medicinePrescribed | array of objects  | No          | List of prescribed medicines                |
| prescribePatient.extraTreatmentAdvice | string          | No           | Additional advice on treatment              |

---

### prescribePatient.medicinePrescribed

| **Field**                          | **Type**   | **Required** | **Description**                              |
|------------------------------------|------------|--------------|----------------------------------------------|
| prescribePatient.medicinePrescribed[].name       | string  | Yes   | Name of the medicine                         |
| prescribePatient.medicinePrescribed[].frequency  | string  | Yes   | Dosage frequency (e.g., "1-0-1")            |
| prescribePatient.medicinePrescribed[].duration   | string  | Yes   | Duration of the prescription (e.g., "1week")|
| prescribePatient.medicinePrescribed[].timing     | string  | Yes    | Timing of medication (e.g., "a/m", "p/m")   |
| prescribePatient.medicinePrescribed[].otherAdviseOnMedicine | string | No | Additional advice regarding the medicine |

</details>
git 