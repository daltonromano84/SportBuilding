using RestSharp;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace SportBuildingAPI.Helpers
{
    public static class RestHelper
    {
        public static IRestResponse Post<T>(string url, string resource, T objeto)
        {
            var client = new RestClient(url);
            var request = new RestRequest(resource, Method.POST);
           // request.AddHeader("API-KeyName", ConfigurationManager.AppSettings["API-KeyValue"]);
           // request.AddHeader("Accept", "application/json");
           // request.RequestFormat = DataFormat.Json;
            request.AddJsonBody(objeto);
            IRestResponse result = client.Execute(request);

            return result;
        }

        public static IRestResponse Post(string url, string resource, object objeto)
        {
            var client = new RestClient(url);
            RestRequest request = new RestRequest(resource, Method.POST);
             request.AddJsonBody(objeto);
            
          //  var request = new RestRequest(resource, Method.POST);
            //request.AddHeader("API-KeyName", ConfigurationManager.AppSettings["API-KeyValue"]);
            //request.AddHeader("Accept", "application/json");
            //request.RequestFormat = DataFormat.Json;
           // request.AddJsonBody(objeto);
            IRestResponse result = client.Execute(request);

            return result;
        }

        public static IRestResponse Get(string url, string resource, object objeto)
        {
            var client = new RestClient(url);
            var request = new RestRequest(resource, Method.GET);
            request.AddHeader("API-KeyName", ConfigurationManager.AppSettings["API-KeyValue"]);
            request.AddHeader("Accept", "application/json");
            request.RequestFormat = DataFormat.Json;
            request.AddJsonBody(objeto);

            IRestResponse result = client.Execute(request);

            return result;
        }

        public static IRestResponse Get(string url, string resource, Dictionary<string, string> parametros = null)
        {
            var client = new RestClient(url);
            var request = new RestRequest(resource, Method.GET);
            request.AddHeader("API-KeyName", ConfigurationManager.AppSettings["API-KeyValue"]);
            request.AddHeader("Accept", "application/json");
            request.RequestFormat = DataFormat.Json;

            if (parametros != null)
            {
                foreach (var parametro in parametros)
                {
                    request.AddParameter(parametro.Key, parametro.Value, ParameterType.UrlSegment);
                }
            }

            IRestResponse result = client.Execute(request);

            return result;
        }

        public static IRestResponse Put<T>(string url, string resource, T objeto)
        {
            var client = new RestClient(url);
            var request = new RestRequest(resource, Method.PUT);
            request.AddHeader("API-KeyName", ConfigurationManager.AppSettings["API-KeyValue"]);
            request.AddHeader("Accept", "application/json");
            request.RequestFormat = DataFormat.Json;
            request.AddJsonBody(objeto);
            IRestResponse result = client.Execute(request);

            return result;
        }

        public static IRestResponse Get(string url, string resource)
        {
            return Get(url, resource, null);
        }
    }
}