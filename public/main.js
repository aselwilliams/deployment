const baseUrl='https://3.129.11.158'
const form = document.querySelector('form')
const nameEl = document.querySelector('#name')
const company = document.querySelector('#company')
const email = document.querySelector('#email')
const phone = document.querySelector('#phone')
const container = document.querySelector('tbody')

function renderUsers(res) {
  container.innerHTML = ''

res.map((el, i)=> {
    return container.innerHTML += `
    <p>${el.name}</p>
    // <tr name=${i}>
    //     <td>${el.name}</td>
    //     <td>${el.company}</td>
    //     <td>${el.email}</td>
    //     <td>${el.phone}</td>
    // </tr>
    `
})
document.querySelectorAll('tr').forEach(element => {
    const theIndexValue = element.getAttribute('name');

    element.addEventListener('click', () => {
        axios
            .delete(`${baseUrl}/api/users/${theIndexValue}`)
            .then(res => {
                renderUsers(res)
            })
    })
})
}

function submitHandler(e) {
    e.preventDefault();

    axios
        .post(`${baseUrl}/api/users`, { 
            name: nameEl.value
            // company: company.value,
            // email: email.value,
            // phone: phone.value
         })
        .then(res => {
            renderUsers(res)
        })
        .catch(err => {
            nameEl.value = ''
            // company.value = ''
            // email.value = ''
            // phone.value = ''

            const notif = document.createElement('aside')
            notif.innerHTML = `<p>${err.response.data}</p>
            <button class="close">close</button>`
            document.body.appendChild(notif)

            document.querySelectorAll('.close').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.target.parentNode.remove()
                })
            })
        })
}

//get all users on initial load
axios.get(`${baseUrl}/api/users`)
    .then(res=> {
        console.log(res,'res')
        console.log(res.data)
        renderUsers(res)
    })

    form.addEventListener('submit', submitHandler)