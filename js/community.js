document.addEventListener("DOMContentLoaded", () => {
  const forumData = [
    {
      id: 1,
      title: "Procreate",
      description: "A discussion about using Procreate",
      icon: "../assets/images/icons/procreate.png",
      replies: "8.3k",
      lastActive: "3h ago",
    },
    {
      id: 2,
      title: "Photoshop",
      description: "A discussion about using Photoshop",
      icon: "../assets/images/icons/photoshop.png",
      replies: "7.2k",
      lastActive: "4h ago",
    },
    {
      id: 3,
      title: "Adobe Illustrator",
      description: "A discussion about using Illustrator",
      icon: "../assets/images/icons/illustrator.png",
      replies: "6.5k",
      lastActive: "5h ago",
    },
    {
      id: 4,
      title: "After Effects",
      description: "A discussion about using After Effects",
      icon: "../assets/images/icons/aftereffects.png",
      replies: "5.1k",
      lastActive: "6h ago",
    },
  ];

  const activitiesData = [
    {
      id: 1,
      user: "@sarah_illustrates",
      action: "shared a new illustration",
      avatar: "../assets/images/avatars/user1.jpg",
      time: "3h ago",
    },
    {
      id: 2,
      user: "@mike_designs",
      action: "created a new logo design",
      avatar: "../assets/images/avatars/user2.jpg",
      time: "4h ago",
    },
    {
      id: 3,
      user: "@jane_photos",
      action: "shared a new photography work",
      avatar: "../assets/images/avatars/user3.jpg",
      time: "5h ago",
    },
    {
      id: 4,
      user: "@chris_doodles",
      action: "started following you",
      avatar: "../assets/images/avatars/user4.jpg",
      time: "6h ago",
    },
  ];

  const usersData = [
    {
      id: 1,
      username: "@sarah_illustrates",
      role: "Illustrator",
      avatar: "../assets/images/avatars/user1.jpg",
      isFollowing: false,
    },
    {
      id: 2,
      username: "@mike_designs",
      role: "Designer",
      avatar: "../assets/images/avatars/user2.jpg",
      isFollowing: false,
    },
    {
      id: 3,
      username: "@jane_photos",
      role: "Photographer",
      avatar: "../assets/images/avatars/user3.jpg",
      isFollowing: false,
    },
    {
      id: 4,
      username: "@chris_doodles",
      role: "Artist",
      avatar: "../assets/images/avatars/user4.jpg",
      isFollowing: false,
    },
  ];

  const followButtons = document.querySelectorAll(".user-card .btn-secondary");
  followButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      const user = usersData[index];
      user.isFollowing = !user.isFollowing;
      button.textContent = user.isFollowing ? "Following" : "Follow";
      button.classList.toggle("following");

      if (user.isFollowing) {
        const newActivity = {
          user: user.username,
          action: "is now following you",
          avatar: user.avatar,
          time: "Just now",
        };
        addNewActivity(newActivity);
      }
    });
  });

  function addNewActivity(activity) {
    const activityList = document.querySelector(".activity-list");
    const activityItem = document.createElement("div");
    activityItem.className = "activity-item";
    activityItem.innerHTML = `
            <img src="${activity.avatar}" alt="User Avatar" class="activity-avatar">
            <div class="activity-content">
                <p><strong>${activity.user}</strong> ${activity.action}</p>
                <span class="activity-time">${activity.time}</span>
            </div>
        `;

    activityList.insertBefore(activityItem, activityList.firstChild);

    if (activityList.children.length > 4) {
      activityList.removeChild(activityList.lastChild);
    }

    activityItem.style.opacity = "0";
    activityItem.style.transform = "translateY(-10px)";
    setTimeout(() => {
      activityItem.style.transition = "all 0.3s ease";
      activityItem.style.opacity = "1";
      activityItem.style.transform = "translateY(0)";
    }, 10);
  }

  const forumItems = document.querySelectorAll(".forum-item");
  forumItems.forEach((item) => {
    item.addEventListener("click", () => {
      item.style.transform = "scale(0.98)";
      setTimeout(() => {
        item.style.transform = "";
      }, 100);
    });
  });

  const newDiscussionBtn = document.querySelector(
    ".section-header .btn-primary"
  );
  if (newDiscussionBtn) {
    newDiscussionBtn.addEventListener("click", () => {
      alert("Create new discussion feature coming soon!");
    });
  }

  function handleImageError(img) {
    img.src = "../assets/images/placeholder.jpg";
  }

  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", () => handleImageError(img));
  });

  function updateActivityTimes() {
    const times = document.querySelectorAll(".activity-time");
    times.forEach((time) => {
      const currentTime = time.textContent;
      if (currentTime.includes("ago")) {
        const number = parseInt(currentTime);
        if (!isNaN(number)) {
          time.textContent = `${number + 1}h ago`;
        }
      }
    });
  }

  setInterval(updateActivityTimes, 3600000);
});
