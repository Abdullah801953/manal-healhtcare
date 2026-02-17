import { Doctor, Achievement } from '../../types';
import { Award, Trophy, FileText, Image as ImageIcon, Download, ExternalLink } from 'lucide-react';

interface AchievementsSectionProps {
  doctor: Doctor;
}

const getFileIcon = (fileType?: string) => {
  if (!fileType) return <FileText className="w-5 h-5 text-gray-400" />;
  if (fileType.startsWith('image/')) return <ImageIcon className="w-5 h-5 text-green-500" />;
  if (fileType === 'application/pdf') return <FileText className="w-5 h-5 text-red-500" />;
  return <FileText className="w-5 h-5 text-blue-500" />;
};

const getFileTypeLabel = (fileType?: string) => {
  if (!fileType) return 'File';
  if (fileType.startsWith('image/')) return 'Image';
  if (fileType === 'application/pdf') return 'PDF';
  if (fileType.includes('word')) return 'Document';
  if (fileType.includes('excel') || fileType.includes('spreadsheet')) return 'Spreadsheet';
  return 'File';
};

export function AchievementsSection({ doctor }: AchievementsSectionProps) {
  if (!doctor.achievements || doctor.achievements.length === 0) {
    return null;
  }

  // Handle both old string format and new object format
  const formattedAchievements: Achievement[] = doctor.achievements.map((a: any) => {
    if (typeof a === 'string') {
      return { title: a };
    }
    return a;
  });

  // Filter out empty achievements
  const validAchievements = formattedAchievements.filter(a => a.title && a.title.trim() !== '');

  if (validAchievements.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl shadow-sm p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl">
          <Trophy className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Awards & Achievements</h2>
      </div>
      
      <div className="space-y-4">
        {validAchievements.map((achievement, index) => (
          <div 
            key={index} 
            className="flex items-start gap-4 p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-amber-100"
          >
            <div className="shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center">
                <Award className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-gray-800 font-medium leading-relaxed">{achievement.title}</p>
              
              {/* File attachment display */}
              {achievement.file && (
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
                    {getFileIcon(achievement.fileType)}
                    <span className="text-sm text-gray-600">
                      {achievement.fileName || getFileTypeLabel(achievement.fileType)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={achievement.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-amber-700 bg-amber-100 hover:bg-amber-200 rounded-lg transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View
                    </a>
                    <a
                      href={achievement.file}
                      download={achievement.fileName}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-green-700 bg-green-100 hover:bg-green-200 rounded-lg transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Achievement count badge */}
      <div className="mt-6 pt-6 border-t border-amber-200">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <Trophy className="w-4 h-4 text-amber-500" />
          <span className="font-semibold">{validAchievements.length} Professional Achievement{validAchievements.length !== 1 ? 's' : ''}</span>
        </div>
      </div>
    </div>
  );
}
