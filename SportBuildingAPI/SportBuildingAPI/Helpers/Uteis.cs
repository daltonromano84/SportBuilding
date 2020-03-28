using System;
using System.Text;

namespace SportBuildingAPI.Helpers
{
    public class Uteis 
    {
        public string GeraSenhaAlfanumerica(int tamanho)
        {
            var stringBuilder = new StringBuilder();
            var random = new Random();

            for (var i = 0; i < tamanho; i++)
            {
                var value = (char)random.Next(65, 90);
                var next = random.Next(0, 9);
                var nextValue = random.Next(-1, 1);

                if (Convert.ToBoolean(nextValue))
                    stringBuilder.Append(value);
                else
                    stringBuilder.Append(next);
            }

            return stringBuilder.ToString().ToLower();
        }

    }
}