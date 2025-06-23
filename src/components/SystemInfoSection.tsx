
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Info, DollarSign, Users, TrendingUp, Shield } from 'lucide-react';

const SystemInfoSection = () => {
  return (
    <Card className="glass-effect border-neon-purple/30 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Info className="w-6 h-6 text-neon-purple" />
        <h2 className="text-2xl font-orbitron font-bold text-neon-purple">
          О системе
        </h2>
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        <AccordionItem value="matrix-system" className="border-neon-blue/20">
          <AccordionTrigger className="text-white hover:text-neon-blue">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-neon-blue" />
              <span>Как работает матричная система</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-gray-300">
            <div className="space-y-4">
              <p>
                Матричная реферальная программа работает по принципу многоуровневой структуры, 
                где каждый участник может занимать позиции в матрице других участников.
              </p>
              <div className="bg-neon-blue/10 border border-neon-blue/30 rounded-lg p-4">
                <h4 className="font-semibold text-neon-blue mb-2">Основные принципы:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Каждый уровень содержит 7 позиций</li>
                  <li>1 позиция в верхней части, 2 в средней, 4 в нижней</li>
                  <li>Заполнение происходит по принципу "снизу вверх"</li>
                  <li>При заполнении всех позиций происходит перезапуск уровня</li>
                </ul>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="levels-system" className="border-neon-green/20">
          <AccordionTrigger className="text-white hover:text-neon-green">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-neon-green" />
              <span>Система уровней и стоимость</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-gray-300">
            <div className="space-y-4">
              <p>
                Система состоит из 10 уровней с прогрессивной стоимостью активации.
                Каждый следующий уровень стоит в 2 раза дороже предыдущего.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { level: 1, price: '0.01 BNB' },
                  { level: 2, price: '0.02 BNB' },
                  { level: 3, price: '0.04 BNB' },
                  { level: 4, price: '0.08 BNB' },
                  { level: 5, price: '0.16 BNB' },
                  { level: 6, price: '0.32 BNB' },
                  { level: 7, price: '0.64 BNB' },
                  { level: 8, price: '1.28 BNB' },
                  { level: 9, price: '2.56 BNB' },
                  { level: 10, price: '5.12 BNB' }
                ].map(({ level, price }) => (
                  <div key={level} className="bg-neon-green/10 border border-neon-green/30 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Уровень {level}</span>
                      <Badge className="bg-neon-green/20 text-neon-green">{price}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="rewards-system" className="border-neon-purple/20">
          <AccordionTrigger className="text-white hover:text-neon-purple">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-neon-purple" />
              <span>Система наград и выплат</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-gray-300">
            <div className="space-y-4">
              <p>
                Награды начисляются автоматически при заполнении позиций в матрице.
                Система справедливого распределения обеспечивает стабильный доход.
              </p>
              <div className="bg-neon-purple/10 border border-neon-purple/30 rounded-lg p-4">
                <h4 className="font-semibold text-neon-purple mb-2">Типы выплат:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li><strong>Прямые выплаты:</strong> От прямых рефералов</li>
                  <li><strong>Матричные выплаты:</strong> От заполнения позиций</li>
                  <li><strong>Бонусы перезапуска:</strong> При закрытии матрицы</li>
                  <li><strong>Резервные выплаты:</strong> Дополнительные награды</li>
                </ul>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="security" className="border-yellow-500/20">
          <AccordionTrigger className="text-white hover:text-yellow-400">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-yellow-400" />
              <span>Безопасность и прозрачность</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-gray-300">
            <div className="space-y-4">
              <p>
                Вся система работает на блокчейне BNB Chain, что обеспечивает 
                полную прозрачность и безопасность всех операций.
              </p>
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-400 mb-2">Гарантии безопасности:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Все транзакции записываются в блокчейн</li>
                  <li>Смарт-контракты проверены на безопасность</li>
                  <li>Невозможность изменения правил игры</li>
                  <li>Автоматические выплаты без посредников</li>
                </ul>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default SystemInfoSection;
