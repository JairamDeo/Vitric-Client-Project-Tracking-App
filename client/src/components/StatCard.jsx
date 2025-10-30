import React from 'react';
import { TrendingUp } from 'lucide-react';

const StatCard = React.memo(({ title, value, percentage, icon: Icon, iconBgColor, iconColor }) => {
  return (
    <div className="bg-white rounded-xl shadow-custom p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-fadeIn border border-maroon-20">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-darkBrown text-sm font-medium mb-2">{title}</p>
          <h3 className="text-4xl font-bold text-darkBrown mb-2">{value}</h3>
          <div className="flex items-center text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span className="text-sm font-semibold">{percentage}</span>
          </div>
        </div>
        <div className={`${iconBgColor} rounded-xl p-4 shadow-md`}>
          <Icon className={`w-8 h-8 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
});

StatCard.displayName = 'StatCard';

export default StatCard;