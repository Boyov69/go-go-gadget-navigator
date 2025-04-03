
import { AIAssistantLog } from "@/types/aiAssistant";
import { CommandType } from "./AICommandProcessor";
import { AILoggingService } from "./AILoggingService";

/**
 * Service for retrieving and filtering AI Assistant data
 */
export class AIDataService {
  /**
   * Get logs with filtering
   */
  static getFilteredLogs(
    filters: {
      commandType?: CommandType | string;
      success?: boolean;
      startDate?: Date;
      endDate?: Date;
      userId?: string;
    }
  ): AIAssistantLog[] {
    const logs = AILoggingService.getLogs();
    return logs.filter(log => {
      if (filters.commandType !== undefined && log.commandType !== filters.commandType) return false;
      if (filters.success !== undefined && log.success !== filters.success) return false;
      if (filters.startDate && log.timestamp < filters.startDate) return false;
      if (filters.endDate && log.timestamp > filters.endDate) return false;
      if (filters.userId && log.userId !== filters.userId) return false;
      return true;
    });
  }
}
