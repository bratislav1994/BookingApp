import { BookingAppCliPage } from './app.po';

describe('booking-app-cli App', () => {
  let page: BookingAppCliPage;

  beforeEach(() => {
    page = new BookingAppCliPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
