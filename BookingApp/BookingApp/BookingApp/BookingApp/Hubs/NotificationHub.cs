using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Timers;
using System.Web;
using System.Web.UI;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using BookingApp.Models;

namespace BookingApp.Hubs
{
    [HubName("notifications")]
    public class NotificationHub : Hub
    {
        private static IHubContext hubContext = GlobalHost.ConnectionManager.GetHubContext<NotificationHub>();
        private static Timer t = new Timer();
        private static BAContext db = new BAContext();
        
        public void GetTime()
        {
            Clients.All.setRealTime(DateTime.Now.ToString("h:mm:ss tt"));
        }

        public void TimeServerUpdates()
        {
            t.Interval = 1000;
            t.Start();
            t.Elapsed += OnTimedEvent;
        }

        private void OnTimedEvent(object source, ElapsedEventArgs e)
        {
            GetTime();
        }

        public void StopTimeServerUpdates()
        {
            t.Stop();
        }

        public override Task OnConnected()
        {
            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            Groups.Remove(Context.ConnectionId, "Admins");
            return base.OnDisconnected(stopCalled);
        }

        public void AddUsersToGroup(int Id, string role)
        {
            if (role.Equals("Admin"))
            {
                Groups.Add(Context.ConnectionId, "Admins");
            }
            else if (role.Equals("Manager"))
            {
                Groups.Add(Context.ConnectionId, Id.ToString()); // za svakog pojedinacno
            }
        }

        public static void NotifyNewAccommodationAdded(int id)
        {
            hubContext.Clients.Group("Admins").newAccommodationAddedNotification(id);
        }
        
        public static void NotifyApprovedAccommodation(string userId, int accommodationId)
        {
            hubContext.Clients.Group(userId).approvedAccommodationNotification(accommodationId);
        }
    }
}