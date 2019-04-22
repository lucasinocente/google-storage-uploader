const displayNotification = () => {
  const { classList } = document.getElementById('notification')
  classList.add('animated', 'fadeInUp')
  classList.remove('fadeOutDown')

  setTimeout(
    function () {
      classList.add('animated', 'fadeOutDown')
      classList.remove('fadeInUp')
    }, 2000)
}