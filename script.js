document.addEventListener("DOMContentLoaded", () => {
    const groupsContainer = document.getElementById("groups-container");
  
    // Fetch data dari API
    fetch("http://localhost:3000/groups")
      .then((response) => response.json())
      .then((groups) => {
        groups.forEach((group) => {
          // Buat card untuk tiap kelompok
          const card = document.createElement("div");
          card.className = "card";
  
          // Tambahkan nama kelompok
          const groupName = document.createElement("h2");
          groupName.textContent = group.group_name;
          card.appendChild(groupName);
  
          // Buat list mahasiswa
          const studentsList = document.createElement("ul");
          group.students.forEach((student) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${student.name} - ${student.class}`;
            studentsList.appendChild(listItem);
          });
  
          card.appendChild(studentsList);
          groupsContainer.appendChild(card);
        });
      })
      .catch((error) => {
        console.error("Error fetching groups:", error);
        groupsContainer.innerHTML =
          "<p>Oops! Data tidak bisa dimuat. Cek koneksi atau server API-nya.</p>";
      });
  });
  