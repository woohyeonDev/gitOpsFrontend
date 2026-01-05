<script lang="ts">
  import { onMount } from 'svelte';

  // Mock data for demo
  let user = {
    name: 'karim jeong',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=4a90e2&color=fff',
    email: 'john.doe@example.com'
  };

  let myCourses = [
    {
      id: 1,
      title: 'Introduction to Web Development',
      instructor: 'Dr. Sarah Johnson',
      progress: 75,
      thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop',
      nextLesson: 'JavaScript Fundamentals',
      totalLessons: 24,
      completedLessons: 18
    },
    {
      id: 2,
      title: 'Advanced TypeScript Patterns',
      instructor: 'Prof. Michael Chen',
      progress: 45,
      thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=250&fit=crop',
      nextLesson: 'Generic Types',
      totalLessons: 16,
      completedLessons: 7
    },
    {
      id: 3,
      title: 'UI/UX Design Principles',
      instructor: 'Emily Rodriguez',
      progress: 90,
      thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
      nextLesson: 'Final Project Review',
      totalLessons: 20,
      completedLessons: 18
    }
  ];

  let recommendedCourses = [
    {
      id: 4,
      title: 'Python for Data Science',
      instructor: 'Dr. Alex Kim',
      students: 1250,
      rating: 4.8,
      thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=250&fit=crop',
      duration: '8 weeks'
    },
    {
      id: 5,
      title: 'Machine Learning Basics',
      instructor: 'Prof. Lisa Wang',
      students: 890,
      rating: 4.9,
      thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop',
      duration: '10 weeks'
    },
    {
      id: 6,
      title: 'Mobile App Development',
      instructor: 'David Martinez',
      students: 650,
      rating: 4.7,
      thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop',
      duration: '12 weeks'
    }
  ];

  let recentActivities = [
    { type: 'assignment', title: 'JavaScript Quiz #5 submitted', time: '2 hours ago', course: 'Web Development' },
    { type: 'lesson', title: 'Completed "React Hooks"', time: '1 day ago', course: 'Web Development' },
    { type: 'discussion', title: 'Posted in "Design Critique" forum', time: '2 days ago', course: 'UI/UX Design' },
    { type: 'grade', title: 'Received grade for Project #3', time: '3 days ago', course: 'TypeScript Patterns' }
  ];

  function getActivityIcon(type: string) {
    switch(type) {
      case 'assignment': return '📝';
      case 'lesson': return '✅';
      case 'discussion': return '💬';
      case 'grade': return '⭐';
      default: return '📌';
    }
  }
</script>

<div class="lms-container">
  <!-- Header -->
  <header class="header">
    <div class="header-content">
      <div class="logo">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="40" rx="8" fill="#4a90e2"/>
          <path d="M12 28V12H18V28H12Z" fill="white"/>
          <path d="M22 28V16H28V28H22Z" fill="white"/>
        </svg>
        <h1>Tube LXA</h1>
      </div>
      <nav class="nav">
        <a href="/" class="nav-link active">Dashboard</a>
        <a href="/courses" class="nav-link">Courses</a>
        <a href="/calendar" class="nav-link">Calendar</a>
        <a href="/grades" class="nav-link">Grades</a>
      </nav>
      <div class="header-actions">
        <button class="icon-btn">
          <span>🔔</span>
        </button>
        <div class="user-menu">
          <img src={user.avatar} alt={user.name} class="avatar" />
          <span class="user-name">{user.name}</span>
        </div>
      </div>
    </div>
  </header>

  <!-- Main Content -->
  <main class="main-content">
    <!-- Welcome Section -->
    <section class="welcome-section">
      <div class="welcome-text">
        <h2>Welcome back, {user.name.split(' ')[0]}!</h2>
        <p>You have {myCourses.length} courses in progress. Keep up the great work!</p>
      </div>
      <div class="quick-stats">
        <div class="stat-card">
          <div class="stat-value">3</div>
          <div class="stat-label">Active Courses</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">18</div>
          <div class="stat-label">Completed</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">4.8</div>
          <div class="stat-label">Avg. Grade</div>
        </div>
      </div>
    </section>

    <!-- My Courses Section -->
    <section class="section">
      <div class="section-header">
        <h3>My Courses</h3>
        <a href="/courses" class="view-all">View All →</a>
      </div>
      <div class="courses-grid">
        {#each myCourses as course}
          <div class="course-card">
            <div class="course-thumbnail">
              <img src={course.thumbnail} alt={course.title} />
              <div class="progress-badge">{course.progress}%</div>
            </div>
            <div class="course-content">
              <h4>{course.title}</h4>
              <p class="instructor">{course.instructor}</p>
              <div class="progress-bar">
                <div class="progress-fill" style="width: {course.progress}%"></div>
              </div>
              <div class="course-meta">
                <span class="lessons-count">{course.completedLessons}/{course.totalLessons} lessons</span>
                <span class="next-lesson">Next: {course.nextLesson}</span>
              </div>
              <button class="continue-btn">Continue Learning</button>
            </div>
          </div>
        {/each}
      </div>
    </section>

    <!-- Recent Activity & Recommended Courses -->
    <div class="two-column">
      <!-- Recent Activity -->
      <section class="section">
        <div class="section-header">
          <h3>Recent Activity</h3>
        </div>
        <div class="activity-list">
          {#each recentActivities as activity}
            <div class="activity-item">
              <span class="activity-icon">{getActivityIcon(activity.type)}</span>
              <div class="activity-content">
                <p class="activity-title">{activity.title}</p>
                <p class="activity-meta">
                  <span class="activity-course">{activity.course}</span>
                  <span class="activity-time">{activity.time}</span>
                </p>
              </div>
            </div>
          {/each}
        </div>
      </section>

      <!-- Recommended Courses -->
      <section class="section">
        <div class="section-header">
          <h3>Recommended for You</h3>
        </div>
        <div class="recommended-list">
          {#each recommendedCourses as course}
            <div class="recommended-card">
              <img src={course.thumbnail} alt={course.title} class="recommended-thumb" />
              <div class="recommended-content">
                <h4>{course.title}</h4>
                <p class="instructor">{course.instructor}</p>
                <div class="recommended-meta">
                  <span>⭐ {course.rating}</span>
                  <span>👥 {course.students}</span>
                  <span>⏱️ {course.duration}</span>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </section>
    </div>
  </main>
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    background: #f5f7fa;
  }

  .lms-container {
    min-height: 100vh;
  }

  /* Header */
  .header {
    background: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .header-content {
    max-width: 1400px;
    margin: 0 auto;
    padding: 1rem 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .logo h1 {
    font-size: 1.25rem;
    margin: 0;
    color: #2c3e50;
    font-weight: 600;
  }

  .nav {
    display: flex;
    gap: 2rem;
    flex: 1;
  }

  .nav-link {
    color: #64748b;
    text-decoration: none;
    font-weight: 500;
    padding: 0.5rem 0;
    border-bottom: 2px solid transparent;
    transition: all 0.2s;
  }

  .nav-link:hover {
    color: #4a90e2;
  }

  .nav-link.active {
    color: #4a90e2;
    border-bottom-color: #4a90e2;
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .icon-btn {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50%;
    transition: background 0.2s;
  }

  .icon-btn:hover {
    background: #f0f4f8;
  }

  .user-menu {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
  }

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid #e2e8f0;
  }

  .user-name {
    font-weight: 500;
    color: #2c3e50;
  }

  /* Main Content */
  .main-content {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
  }

  /* Welcome Section */
  .welcome-section {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 16px;
    padding: 2rem;
    color: white;
    margin-bottom: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .welcome-text h2 {
    font-size: 2rem;
    margin: 0 0 0.5rem 0;
  }

  .welcome-text p {
    margin: 0;
    opacity: 0.9;
    font-size: 1.1rem;
  }

  .quick-stats {
    display: flex;
    gap: 1.5rem;
  }

  .stat-card {
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    padding: 1.5rem;
    border-radius: 12px;
    text-align: center;
    min-width: 100px;
  }

  .stat-value {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.25rem;
  }

  .stat-label {
    font-size: 0.875rem;
    opacity: 0.9;
  }

  /* Sections */
  .section {
    margin-bottom: 2rem;
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .section-header h3 {
    font-size: 1.5rem;
    margin: 0;
    color: #2c3e50;
  }

  .view-all {
    color: #4a90e2;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;
  }

  .view-all:hover {
    color: #357abd;
  }

  /* Courses Grid */
  .courses-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 1.5rem;
  }

  .course-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .course-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  }

  .course-thumbnail {
    position: relative;
    width: 100%;
    height: 200px;
    overflow: hidden;
  }

  .course-thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .progress-badge {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: rgba(74, 144, 226, 0.95);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-weight: 600;
    font-size: 0.875rem;
  }

  .course-content {
    padding: 1.5rem;
  }

  .course-content h4 {
    margin: 0 0 0.5rem 0;
    font-size: 1.125rem;
    color: #2c3e50;
  }

  .instructor {
    color: #64748b;
    font-size: 0.875rem;
    margin: 0 0 1rem 0;
  }

  .progress-bar {
    height: 8px;
    background: #e2e8f0;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 1rem;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #4a90e2, #667eea);
    border-radius: 4px;
    transition: width 0.3s;
  }

  .course-meta {
    display: flex;
    justify-content: space-between;
    font-size: 0.875rem;
    color: #64748b;
    margin-bottom: 1rem;
  }

  .next-lesson {
    color: #4a90e2;
    font-weight: 500;
  }

  .continue-btn {
    width: 100%;
    background: #4a90e2;
    color: white;
    border: none;
    padding: 0.75rem;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s;
  }

  .continue-btn:hover {
    background: #357abd;
  }

  /* Two Column Layout */
  .two-column {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  /* Activity List */
  .activity-list {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  .activity-item {
    display: flex;
    gap: 1rem;
    padding: 1rem 0;
    border-bottom: 1px solid #f0f4f8;
  }

  .activity-item:last-child {
    border-bottom: none;
  }

  .activity-icon {
    font-size: 1.5rem;
  }

  .activity-content {
    flex: 1;
  }

  .activity-title {
    margin: 0 0 0.25rem 0;
    color: #2c3e50;
    font-weight: 500;
  }

  .activity-meta {
    display: flex;
    gap: 1rem;
    font-size: 0.875rem;
    color: #64748b;
  }

  .activity-time {
    opacity: 0.7;
  }

  /* Recommended Courses */
  .recommended-list {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  .recommended-card {
    display: flex;
    gap: 1rem;
    padding: 1rem 0;
    border-bottom: 1px solid #f0f4f8;
    cursor: pointer;
    transition: background 0.2s;
    border-radius: 8px;
    margin: 0 -0.5rem;
    padding: 1rem 0.5rem;
  }

  .recommended-card:hover {
    background: #f8fafc;
  }

  .recommended-card:last-child {
    border-bottom: none;
  }

  .recommended-thumb {
    width: 100px;
    height: 70px;
    object-fit: cover;
    border-radius: 8px;
  }

  .recommended-content {
    flex: 1;
  }

  .recommended-content h4 {
    margin: 0 0 0.25rem 0;
    font-size: 1rem;
    color: #2c3e50;
  }

  .recommended-meta {
    display: flex;
    gap: 1rem;
    font-size: 0.75rem;
    color: #64748b;
    margin-top: 0.5rem;
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .two-column {
      grid-template-columns: 1fr;
    }

    .quick-stats {
      flex-direction: column;
      gap: 1rem;
    }

    .stat-card {
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    .header-content {
      flex-wrap: wrap;
    }

    .nav {
      order: 3;
      width: 100%;
    }

    .courses-grid {
      grid-template-columns: 1fr;
    }

    .welcome-section {
      flex-direction: column;
      gap: 1.5rem;
    }

    .user-name {
      display: none;
    }
  }
</style>
