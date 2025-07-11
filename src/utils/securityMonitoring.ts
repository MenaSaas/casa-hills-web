
import { supabase } from '@/integrations/supabase/client';

export interface SecurityAlert {
  id: string;
  type: 'failed_login' | 'suspicious_activity' | 'rate_limit_exceeded' | 'injection_attempt';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  details: any;
  timestamp: string;
  ip_address?: string;
  user_agent?: string;
}

// Surveillance en temps réel
class SecurityMonitor {
  private alertThresholds = {
    failed_login: 3,
    suspicious_activity: 1,
    rate_limit_exceeded: 5,
    injection_attempt: 1
  };

  private recentAlerts: Map<string, number> = new Map();

  async logAlert(alert: Omit<SecurityAlert, 'id' | 'timestamp'>): Promise<void> {
    try {
      const fullAlert: SecurityAlert = {
        ...alert,
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        ip_address: alert.ip_address || await this.getClientIP(),
        user_agent: alert.user_agent || navigator.userAgent
      };

      // Pour l'instant, on log en console car les fonctions RPC n'existent pas
      console.log('Alerte de sécurité:', fullAlert);

      // Vérifier si une escalade est nécessaire
      await this.checkForEscalation(fullAlert);

      // Enregistrer localement pour surveillance
      this.updateAlertCount(fullAlert.type);

    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de l\'alerte:', error);
    }
  }

  private async getClientIP(): Promise<string> {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch {
      return 'unknown';
    }
  }

  private updateAlertCount(type: string): void {
    const currentCount = this.recentAlerts.get(type) || 0;
    this.recentAlerts.set(type, currentCount + 1);

    // Nettoyer les anciens compteurs (toutes les heures)
    setTimeout(() => {
      this.recentAlerts.delete(type);
    }, 60 * 60 * 1000);
  }

  private async checkForEscalation(alert: SecurityAlert): Promise<void> {
    const threshold = this.alertThresholds[alert.type as keyof typeof this.alertThresholds];
    const currentCount = this.recentAlerts.get(alert.type) || 0;

    if (currentCount >= threshold) {
      await this.escalateAlert(alert);
    }
  }

  private async escalateAlert(alert: SecurityAlert): Promise<void> {
    // Créer une alerte critique
    const escalatedAlert: SecurityAlert = {
      ...alert,
      id: crypto.randomUUID(),
      severity: 'critical',
      message: `ESCALADE: ${alert.message} (${this.recentAlerts.get(alert.type)} occurrences)`,
      timestamp: new Date().toISOString()
    };

    try {
      // Pour l'instant, on log en console car les fonctions RPC n'existent pas
      console.warn('ALERTE DE SÉCURITÉ CRITIQUE:', escalatedAlert);

    } catch (error) {
      console.error('Erreur lors de l\'escalade:', error);
    }
  }

  // Analyse des patterns suspects
  analyzeActivityPattern(events: any[]): boolean {
    // Détecter les patterns d'attaque
    const rapidRequests = events.filter(event => 
      Date.now() - new Date(event.timestamp).getTime() < 60000
    ).length > 20;

    const multipleFailedLogins = events.filter(event => 
      event.type === 'failed_login' && 
      Date.now() - new Date(event.timestamp).getTime() < 300000
    ).length > 5;

    return rapidRequests || multipleFailedLogins;
  }

  // Surveillance des ressources
  monitorResourceUsage(): void {
    // Surveiller l'utilisation mémoire
    if ('memory' in performance) {
      const memInfo = (performance as any).memory;
      if (memInfo.usedJSHeapSize > memInfo.jsHeapSizeLimit * 0.9) {
        this.logAlert({
          type: 'suspicious_activity',
          severity: 'medium',
          message: 'Utilisation mémoire élevée détectée',
          details: { memoryUsage: memInfo }
        });
      }
    }

    // Surveiller les erreurs JavaScript
    window.addEventListener('error', (event) => {
      this.logAlert({
        type: 'suspicious_activity',
        severity: 'low',
        message: 'Erreur JavaScript détectée',
        details: {
          message: event.message,
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno
        }
      });
    });
  }
}

export const securityMonitor = new SecurityMonitor();

// Initialiser la surveillance
export const initializeSecurityMonitoring = (): void => {
  securityMonitor.monitorResourceUsage();
  
  // Surveillance des modifications DOM suspectes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            if (element.tagName === 'SCRIPT' || element.tagName === 'IFRAME') {
              securityMonitor.logAlert({
                type: 'injection_attempt',
                severity: 'high',
                message: 'Tentative d\'injection de script détectée',
                details: { tagName: element.tagName, innerHTML: element.innerHTML }
              });
            }
          }
        });
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
};
