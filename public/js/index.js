function handleChange() {
  let inputvalue = document.getElementById('search').value.toLowerCase();
  let ul = document.getElementById('todo-list-UL');
  let li = ul.getElementsByTagName('li');
  let searchvalue = inputvalue.toLowerCase();
  //   console.log(searchvalue);
  for (i = 0; i < li.length; i++) {
    let x = li[i].getElementsByClassName('input-edit')[0].value.toLowerCase();
    // console.log(x.indexOf(searchvalue));
    if (x.indexOf(searchvalue) > -1) {
      li[i].style.display = '';
    } else {
      li[i].style.display = 'none';
    }
  }
}
