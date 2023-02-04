<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">   
  <xsl:template match="/">
    <html>
      <body>
        <h1>Catalog</h1>
        <ul>
            <li>
                <article>
                    <h3>Product ID</h3>
                    <xsl:value-of select = "catalog/product/@product_id" />
                </article>
            </li>
            <li>
                <article>
                    <p>Description</p>
                    <xsl:value-of select = "catalog/product/@description" />
                </article>
            </li>
            <li>
                <article>
                    <table border="1">
                        <tr>
                            <th>Item Number</th>
                            <th>Price</th>
                            <th>Gender</th>
                            <th>Small</th>
                            <th>Medium</th>
                            <th>Large</th>
                            <th>Extra Large</th>
                        </tr>
                        <xsl:for-each select = "catalog/product/catalog_item">
                            <tr>
                                <td><xsl:value-of select="item_number" /></td>
                                <td><xsl:value-of select="price" /></td>
                                <td>
                                    <xsl:choose>
                                        <xsl:when test="@gender='Men'">M</xsl:when>
                                        <xsl:when test="@gender='Women'">W</xsl:when>
                                    </xsl:choose>
                                </td>

                                <td>
                                    <xsl:for-each select = "size[@description='Small']">
                                        <table border="1">
                                            <tr>
                                                <th>color</th>
                                                <th>image</th>                                               
                                            </tr>
                                            <xsl:for-each select = "color_swatch">
                                                <td><xsl:value-of select="." /></td>
                                                <td><xsl:value-of select="@image" /></td>        
                                            </xsl:for-each>
                                        </table>
                                    </xsl:for-each>
                                </td>

                                <td>
                                    <xsl:for-each select = "size[@description='Medium']">
                                        <table border="1">
                                            <tr>
                                                <th>color</th>
                                                <th>image</th>                                               
                                            </tr>
                                            <xsl:for-each select = "color_swatch">
                                                <td><xsl:value-of select="." /></td>
                                                <td><xsl:value-of select="@image" /></td>        
                                            </xsl:for-each>
                                        </table>
                                    </xsl:for-each>
                                </td>

                                <td>
                                    <xsl:for-each select = "size[@description='Large']">
                                        <table border="1">
                                            <tr>
                                                <th>color</th>
                                                <th>image</th>                                               
                                            </tr>
                                            <xsl:for-each select = "color_swatch">
                                                <td><xsl:value-of select="." /></td>
                                                <td><xsl:value-of select="@image" /></td>        
                                            </xsl:for-each>
                                        </table>
                                    </xsl:for-each>
                                </td>

                                <td>
                                    <xsl:for-each select = "size[@description='Extra Large']">
                                        <table border="1">
                                            <tr>
                                                <th>color</th>
                                                <th>image</th>                                               
                                            </tr>
                                            <xsl:for-each select = "color_swatch">
                                                <td><xsl:value-of select="." /></td>
                                                <td><xsl:value-of select="@image" /></td>        
                                            </xsl:for-each>
                                        </table>
                                    </xsl:for-each>
                                </td>
                            </tr>
                        </xsl:for-each >
                    </table>
                </article>
            </li>
        </ul>    
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>