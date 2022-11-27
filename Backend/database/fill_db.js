const fs = require("fs").promises;
const fileName = "./names.csv";
const getNames = async () => {
  const data = (await fs.readFile(fileName)).toString().split(/\r?\n/);
  return data;
};
const generateStrings = async (names) => {
  let fullNames = Array(names.length);
  let emails = Array(names.length);
  let passwords = Array(names.length);
  let cnics = Array(names.length);
  let phone_numbers = Array(names.length);
  const cnic = 4230100000000;
  const phone_number = 3200000000;
  let cities = Array(names.length);
  const cityNames = ["Karachi", "Lahore", "Islamabad"];
  const half = Math.floor(names.length / 2);
  const wallet_amounts = Array(half);

  for (let i = 0; i < names.length - 1; i++) {
    fullNames[i] = names[i] + " " + names[i + 1];
    emails[i] = names[i] + "@gmail.com";
    passwords[i] = names[i + 1];
    phone_numbers[i] = "0" + (phone_number + i).toString();
    cnics[i] = (cnic + i).toString();
    cities[i] = cityNames[i % 3];
    if (i < half) {
      wallet_amounts[i] = (Math.random() * 15000 + 1).toFixed(2);
    }
  }
  return {
    full_names: fullNames,
    emails: emails,
    passwords: passwords,
    phone_numbers: phone_numbers,
    cnics: cnics,
    cities: cities,
    wallet_amounts: wallet_amounts,
  };
};

const generateNumbers = async (names) => {
  // for(let)
};

const fillPatients = async (
  patientFullNames,
  patientEmails,
  patientPasswords,
  patientCities,
  patientPhones,
  patientWallets,
  patientsNo
) => {
  for (let i = 0; i < patientsNo; i++) {
    let queryText = `INSERT INTO tabeeb.patients ('${patientPhones[i]}','${patientEmails[i]}','${patientFullNames[i]}','${patientPasswords[i]}','${patientCities[i]}',${patientWallets[i]})`;
  }
};
const fillDB = async () => {
  const names = await getNames();
  const {
    full_names,
    emails,
    passwords,
    phone_numbers,
    cnics,
    cities,
    wallet_amounts,
  } = await generateStrings(names);

  const patientsNo = wallet_amounts.length;
  const patientFullNames = full_names.slice(0, patientsNo);
  const patientEmails = emails.slice(0, patientsNo);
  const patientPasswords = passwords.slice(0, patientsNo);
  const patientCities = cities.slice(0, patientsNo);
  const patientPhones = phone_numbers.slice(0, patientsNo);
  const patientWallets = wallet_amounts.slice(0, patientsNo);

  //   await fillPatients(
  //     patientFullNames,
  //     patientEmails,
  //     patientPasswords,
  //     patientCities,
  //     patientPhones,
  //     patientWallets,
  //     patientsNo
  //   );

  //   }
};
