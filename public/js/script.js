/* eslint-disable no-undef */
const deleteUser = () => {
// eslint-disable-next-line no-restricted-globals
// eslint-disable-next-line no-alert
  const confirmation = confirm('Are you sure?');
  if (confirmation) {
    $.ajax({
      type: 'DELETE',
      url: `/delete/${$(this).data('id')}`
    // eslint-disable-next-line no-restricted-globals
    }).done();
  }
};

$(document).ready(() => {
  $('.deleteBtn').on('click', deleteUser);
});
