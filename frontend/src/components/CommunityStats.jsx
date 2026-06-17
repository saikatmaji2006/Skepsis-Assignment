import { FiBook, FiUsers, FiGrid } from 'react-icons/fi';
import StatsCard from './StatsCard';

export default function CommunityStats({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatsCard
        icon={FiBook}
        label="Total Resources"
        value={stats?.totalNotes || 0}
        color="primary"
      />
      <StatsCard
        icon={FiUsers}
        label="Total Students"
        value={stats?.totalUsers || 0}
        color="accent"
      />
      <StatsCard
        icon={FiGrid}
        label="Subjects Covered"
        value={stats?.totalSubjects || 0}
        color="green"
      />
    </div>
  );
}
